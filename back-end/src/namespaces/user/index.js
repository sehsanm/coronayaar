let userService = require('./userService'); 
let userApi = require('./userApi')

module.exports = (services) => {
   services.express.post('/login' , userApi.login )  ;    
   services.express.post('/register' , userApi.register )  ;    
   return Promise.resolve({}) ; 
} 