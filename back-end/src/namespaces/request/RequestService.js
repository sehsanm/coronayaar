const app = require('../../app');
const userService = require('../user/UserService') ; 

function reqCollection(){
    return app.core().mongo.db().collection('requests')
}
async function createRequest(jwt, obj) {
    let user = await userService.getProfile(jwt) ; 
    if (user.status != 'approved')
        return Promise.reject("User is not Approved!" ) 
    let req = {...obj,  userId: user._id , org: {...user.profile} , status: 'approved' ,  proc_status: 'active' } ; 
    return reqCollection().insertOne(req) ; 
}
async function updateRequest(jwt, reqId , obj) {
    let user = await userService.getProfile(jwt) ; 
    let req = {...obj,  user: user} ; 
    return reqCollection().updateOne(
        {_id : ObjectID(reqId) , userId:  user._id}, 
        {$set: req}) ; 
         
}

async function getAllRequests(jwt , filter) {
    console.log(filter); 
    if (filter.userId) 
        filter.userId = ObjectID(filter.userId); 
    return new Promise((resolve, reject) => {
        reqCollection().find(filter).toArray((err, docs)=>{
            if (err)
                reject(err); 
            else
                resolve(docs);             
        });    
    });
}

module.exports = {
    createRequest: createRequest,
    updateRequest: updateRequest, 
    getAllRequests: getAllRequests 
}
