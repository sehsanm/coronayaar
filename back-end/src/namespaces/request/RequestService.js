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
    ...objectUtil.objectFilter(obj, PUBLIC_FIELDS),
    userId: user._id,
    org: { ...user.profile },
    status: "pending",
    proc_status: "active",
    createdDate: new Date()
  };
  return reqCollection().insertOne(req);
}
async function getRequest(jwt, reqId) {
  let rs = await getRequests({_id: ObjectID(reqId)});
  if (rs.length > 0)
    return rs[0]; 
  else 
    return null ; 
}

async function updateRequest(jwt, reqId, obj) {

  let user = await userService.getProfile(jwt);
  if (userService.isAdmin(jwt)) {
    let req = obj;
    return reqCollection().updateOne(
      { _id: ObjectID(reqId) },
      { $set: req }
    );

  } else {
    let req = objectUtil.objectFilter(obj, PUBLIC_FIELDS);
    return reqCollection().updateOne(
      { _id: ObjectID(reqId), userId: user._id },
      { $set: req }
    );

  }
}

async function getAllRequests(jwt, filter) {
  let mongoFilter = {...filter};
  if (filter.userId) 
    mongoFilter.userId = ObjectID(filter.userId);
  console.log('Request Filter:', mongoFilter);
  return getRequests(mongoFilter);

}

function getRequests(mongoFilter) {
  return reqCollection()
    .aggregate([
      { $match: mongoFilter },
      {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
      },
      { $unwind: "$user" },
    ])
    .toArray().then((arr) => {
      arr.forEach(i => i.user = objectUtil.objectFilter(i.user, userService.PUBLIC_FIELDS));
      console.log('Arrrr:', arr);
      return arr;
    });
}

async function getPledges(jwt, reqId) {
  let ret = await pledgeCollection().aggregate([
    {$match:{ requestId: ObjectID(reqId) }}, 
    {$lookup: {
      from: "users" , 
      localField: "userId", 
      foreignField: "_id" , 
      as: "user" , 
    }}, 
    {$unwind: "$user"}
  ]).toArray().then(result => {
    console.log('RESULT:', result);
    result.forEach( entry  => entry.user =  objectUtil.objectFilter(entry.user, userService.PUBLIC_FIELDS)) ; 
    return result ; 
  });
  return ret;

}
async function upsertPledge(jwt, reqId, pledge) {
  console.log('Pledge:', pledge);
  let objToUpdate = {
    ...objectUtil.objectFilter(pledge, ['quantity', 'pledgeDate', 'description']),
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
  let request = await reqCollection().findOne({_id : ObjectID(reqId)}) ; 
  return pledgeCollection()
    .find({ requestId: ObjectID(reqId) })
    .toArray()
    .then(lst => {
      let totalPledged = 0;
      let pledgeCount = 0;
      console.log('List:', lst)
      lst.forEach(element => {
        totalPledged += (element.quantity || 0);
        pledgeCount++;
      });
      return reqCollection().updateOne({ _id: ObjectID(reqId) },
        { $set: { totalPledged: totalPledged, pledgeCount: pledgeCount ,  quantityLeft: request.quantity - totalPledged } });
    });

}

async function getUserPledges(jwt, userId) {
  let uId = jwt._id;
  //Only admin can query others
  if (userId && userService.isAdmin(jwt))
    uId = userId;

  let pledges = await pledgeCollection().aggregate([
    { $match: { userId: ObjectID(uId) } },
    {
      $lookup: {
        from: "requests",
        localField: "requestId",
        foreignField: "_id",
        as: "request"
      } 
    }, 
    {$unwind : "$request"}]).toArray();

  return pledges;
}

module.exports = {
  createRequest: createRequest,
  getRequest: getRequest,
  updateRequest: updateRequest,
  getAllRequests: getAllRequests,
  upsertPledge: upsertPledge,
  getPledges: getPledges,
  getUserPledges: getUserPledges,
};
