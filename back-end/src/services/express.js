const express = require('express');



module.exports =  (services) => { 
    return new Promise((resolve, reject)=> {

        const PORT = services.env.express.port; 
        const FRONT_DIR = services.env.express.frontDir; 

        let  exp =  express() ;      
        exp.use(express.static(FRONT_DIR))
        .use(express.json()) // for parsing application/json
        .use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        })
        .listen(PORT, () => {
            console.log(`Listening on ${ PORT }`);
            resolve(exp) ; 
        })
        
    }) ; 
}
