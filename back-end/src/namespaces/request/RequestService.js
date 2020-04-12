const app = require("../../app");
const userService = require("../user/UserService");
const objectUtil = require("../../utils/ObjectUtil");
const PUBLIC_FIELDS = ['quantity', 'type', 'requiredBy', 'urgency', 'description'];

function reqCollection() {
  return app
    .core()
    .mongo.db()
    .collection("requests");
}

function pledgeCollection() {
  return app
    .core()
    .mongo.db()
    .collection("pledges");
}

async function createRequest(jwt, obj) {
  let user = await userService.getProfile(jwt);
  if (user.status != "approved") return Promise.reject("User is not Approved!");
  let req = {
    ...objectUtil.objectFilter(obj , PUBLIC_FIELDS),
    userId: user._id,
    org: { ...user.profile },
    status: "pending",
    proc_status: "active",
    createdDate: new Date()
  };
  return reqCollection().insertOne(req);
}
async function getRequest(jwt, reqId) {
  return reqCollection().findOne(
    { _id: ObjectID(reqId)});
}

async function updateRequest(jwt, reqId, obj) {

  let user = await userService.getProfile(jwt);
  if (userService.isAdmin(jwt)) {
    let req = obj;
    return reqCollection().updateOne(
      { _id: ObjectID(reqId)},
      { $set: req }
    );

  } else {
    let req = objectUtil.objectFilter(obj , PUBLIC_FIELDS);
    return reqCollection().updateOne(
      { _id: ObjectID(reqId), userId: user._id },
      { $set: req }
    );
  
  }
}

async function getAllRequests(jwt, filter) {
  console.log(filter);
  if (filter.userId) filter.userId = ObjectID(filter.userId);
  return reqCollection()
    .find(filter)
    .toArray();

}

async function getPledges(jwt, reqId) {
  return pledgeCollection().find({ requestId: ObjectID(reqId) }).toArray();
}
async function upsertPledge(jwt, reqId, pledge) {
  console.log('Pledge:' , pledge); 
  let objToUpdate = {
    ...objectUtil.objectFilter(pledge , ['quantity',  'pledgeDate' , 'description']),
    requestId: ObjectID(reqId),
    userId: ObjectID(jwt._id)
  };
  let existing = await pledgeCollection().findOne({
    requestId: ObjectID(reqId),
    userId: ObjectID(jwt._id)
  });

  if (existing) {
    await pledgeCollection().updateOne(
      { requestId: ObjectID(reqId), userId: ObjectID(jwt._id) },
      { $set: objToUpdate }
    );
  } else {
    await pledgeCollection().insertOne(objToUpdate);
  }
  return summerizeRequest(reqId);
}

async function summerizeRequest(reqId) {
  return pledgeCollection()
    .find({ requestId: ObjectID(reqId) })
    .toArray()
    .then(lst => {
      let totalPledged = 0 ;
      let pledgeCount = 0;
      console.log('List:' , lst)
      lst.forEach(element => {
        totalPledged += (element.quantity || 0);
        pledgeCount++;
      });
      return reqCollection().updateOne({ _id: ObjectID(reqId) },
        { $set: { totalPledged: totalPledged, pledgeCount: pledgeCount } });
    });
}

module.exports = {
  createRequest: createRequest,
  getRequest: getRequest, 
  updateRequest: updateRequest,
  getAllRequests: getAllRequests,
  upsertPledge: upsertPledge,
  getPledges: getPledges, 
};
