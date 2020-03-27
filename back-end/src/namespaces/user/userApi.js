
const userService = require('./userService') ; 
let getCurrentUser = (request) => {
    return userService.getCurrentUser(request.header('Authorization')) ; 
}
module.exports = {
    getCurrentUser : getCurrentUser, 

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
        
    },
    getProfile :  (request, response) => {
        try {
            userService.getProfile(getCurrentUser(request))
                .then((p)=> response.send(p))
                .catch((err) => response.status(404).send(err)) ; 
        } catch(e) {
            response.status(400).send('Faile to save Profile') ; 
        }
    } ,

    saveProfile :  (request, response) => {
        let wrapper = ({orgName , orgDescription , orgCity, orgProvince})=>({orgName , orgDescription , orgCity, orgProvince}) ; 
        try {
            console.log('Saving progile:');
            userService.saveProfile(getCurrentUser(request), wrapper(request.body)) 
                .then((p)=> response.send(p))
        }catch(e) {
            response.status(400).send('Faile to save Profile') ; 
        }
    } ,



}