app = require('./app'); 

let servicesFactories = {
    env: require('./services/env'),
    mongo: require('./services/mongo'),
    express : require('./services/express'), 
    user: require('./namespaces/user'),
    request: require('./namespaces/request'),
}


let services = {} 
let chain = Promise.resolve() ; 
for (let sf in servicesFactories) {
    //initializing services 
    console.log(`Initializing ${sf}`) ;
    chain = chain.then(() => {
        return servicesFactories[sf](services).then((v)=> {services[sf] = v
        } );
    });
}

chain.then(()=> {
    app.ready(services); 
}).catch((err) => {
    console.log('Failed to load the app');  
    process.exit(1) ;
}) ; 


