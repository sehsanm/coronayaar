let requestApi = require('./RequestApi'); 

module.exports = (services) => {
    requestApi.init(services) ;
   return Promise.resolve({}) ; 
} 