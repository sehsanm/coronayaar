const express = require('express');



module.exports =  (services) => { 
    return new Promise((resolve, reject)=> {
        try {
            const PORT = services.env.express.port; 
            const FRONT_DIR = services.env.express.frontDir; 
            process.on('uncaughtException', (err) => {
              console.log(err); 
            });    
            let  exp =  express() ;     
         
            exp.use(express.static(FRONT_DIR))
            .use((req, res, next) => {
                next() ; 
            })
            .use(express.json()) // for parsing application/json
            .use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                next();
            })
            .use(function (err, req, res, next) {
                console.error(err.stack)
                res.status(500).send('Something broke!')
            })
            .listen(PORT, (err , val) => {
                if (!err){
                    console.log(`Listening on ${ PORT }`);
                    resolve(exp) ;
                }else {
                    reject(err); 
                } 
            })
            
    
        }catch(err){
            reject(err) ;
        }
     }) ; 
}
