let userService = require('./userService'); 
let userApi = require('./userApi')

module.exports = (services) => {
   services.express.post('/login' , userApi.login )  ;    
   services.express.post('/register' , userApi.register )  ;  
   services.express.get('/user/profile' , userApi.getProfile )  ;  
   services.express.post('/user/profile' , userApi.saveProfile )  ;  

   return Promise.resolve({
      getCurrentUser : (request) => {
         return userApi.getCurrentUser(request) ; 
      }
   }) ; 
} 