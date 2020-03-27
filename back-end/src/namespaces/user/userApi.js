const userService = require('./userService') ; 
module.exports = {
    login :  (request, response, next) => {
        let user = userService.login(request.body.username, 
            request.body.password) ;
        console.log('user:' , user); 
        user.then((u)=> response.status(200).send(u))
        .catch((err) => response.status(400).send(err));
    },
    register : (request, response, next) => {
        let u = userService.register(request.body.username, 
            request.body.password , 
            request.body.name) ;
        
        u.then((user)=>response.status(200).send(user))
        .catch((err)=>response.status(400).send(err)) ; 
        
    }
}