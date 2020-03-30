let userService = require('./UserService'); 
let userApi = require('./UserApi')

module.exports = (services) => {
   userApi.init(services) ;
   return Promise.resolve({
      getCurrentUser : (request) => {
         return userApi.getCurrentUser(request) ; 
      }
   }) ; 
} 