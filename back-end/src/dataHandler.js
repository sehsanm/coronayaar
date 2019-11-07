
let client ; 

function setupDB(mongoclient) {
    client = mongoclient ; 
}

function addData(obj, callback) {
    client.db(process.env.MONGO_DB).collection('answers').insertOne(obj , callback);
}

module.exports.addDocument =  addData ;  
module.exports.setupDB = setupDB ; 