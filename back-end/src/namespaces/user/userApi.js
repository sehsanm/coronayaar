
const userService = require('./userService') ; 
const objectUtil = require('../../utils/ObjectUtil');
const apiUtil = require('../../utils/ApiUtil');


let init = (services)=> {
    services.express.post('/login' , login )  ;    
    services.express.post('/register' , register )  ;  
    services.express.get('/user/profile' , getProfile )  ;  
    services.express.post('/user/profile' , saveProfile )  ;
    
    services.express.post('/admin/users' , getAllUsers) ;
    services.express.post('/admin/users/:userId' , updateUser) ;
}

let getCurrentUser = (request) => {
    return userService.getCurrentUser(request.header('Authorization')) ; 
}
let login =  (request, response, next) => {
    let user = userService.login(request.body.username, 
        request.body.password) ;
    console.log('user:' , user);
    apiUtil.respond(user , response) ; 
}

let register = (request, response, next) => {
    let u = userService.register(request.body.username, 
        request.body.password , 
        request.body.name) ;
        apiUtil.respond(u , response) ;
} 

let getProfile =  (request, response) => {
    apiUtil.respond( userService.getProfile(getCurrentUser(request)) , response) ; 
}

let saveProfile =  (request, response) => {
    let wrapper = objectUtil.objectFilter(request.body,
         ["orgName", "orgDescription", "orgCity", "orgProvince", "orgType"] 
    ); 
    console.log('Saving progile:');
    apiUtil.respond(userService.saveProfile(getCurrentUser(request), wrapper), response) ;  
        
} 


let getAllUsers = (request, response) => {
    apiUtil.respond(userService.getAllUsers(getCurrentUser(request)) , response) ; 
}

let updateUser = (request, response) => {
    console.log('api:' , request.body);
    apiUtil.respond(userService.updateUser(getCurrentUser(request), 
       request.params.userId, 
       request.body), response); 
}

module.exports = {
    init: init  
}