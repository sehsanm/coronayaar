
const app = require('../../app');
const RequestService = require('./RequestService')
const ApiUtil = require('../../utils/ApiUtil') ;
function createRequest(request, response) {
    console.log('service:' , RequestService) ;  
    ApiUtil.respond(RequestService.createRequest(app.core().user.getCurrentUser(request),
        request.body), 
    response);          
}
function updateRequest(request, response) {
    ApiUtil.respond(RequestService.updateRequest(app.core().user.getCurrentUser(request),
        request.params.reqId ,  request.body), 
    response);          
}

function getAllRequests(request, response) {
    ApiUtil.respond(RequestService.getAllRequests(app.core().user.getCurrentUser(request),
        request.body), 
    response);          
}

module.exports = {
    init: (services) => {
        services.express.post('/request' , createRequest) ; 
        services.express.post('/request/:reqId' , updateRequest) ; 
        services.express.get('/request' , getAllRequests)
    }
}