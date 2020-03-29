let userService = require('./userService'); 
let userApi = require('./userApi')

module.exports = (services) => {
   userApi.init(services) ;
   return Promise.resolve({
      getCurrentUser : (request) => {
         return userApi.getCurrentUser(request) ; 
      }

   }) ; 
} 