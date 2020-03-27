
const MongoClient = require('mongodb').MongoClient;
module.exports =  (services) => {
    const uri = services.env.mongo.uri;
    const client = new MongoClient(uri, {
      useNewUrlParser: true , 
      useUnifiedTopology: true
    });    
    return new Promise((resolve, reject)=>{
        client.connect(err => {
    
            if (err) {
                console.log('Fatal Error, Cannot Connect to db' , err) ; 
                reject(err) ; 
            } else {
                console.log('Successfully Connected to DB') ; 
                resolve({
                    client: client, 
                    db : () => client.db(services.env.mongo.database)
                }) ; 
            }    
        });  
    }) ;
}