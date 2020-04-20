
const app = require('../../app');
const RequestService = require('./RequestService')
const ApiUtil = require('../../utils/ApiUtil') ;
function createRequest(request, response) {
    ApiUtil.respond(RequestService.createRequest(app.core().user.getCurrentUser(request),
        request.body), 
    response);          
}
function updateRequest(request, response) {
    ApiUtil.respond(RequestService.updateRequest(app.core().user.getCurrentUser(request),
        request.params.reqId ,  request.body), 
    response);          
}

function getRequest(request, response) {
    ApiUtil.respond(RequestService.getRequest(app.core().user.getCurrentUser(request),
        request.params.reqId), 
    response);          
}

function upsertPledge(request, response){
    ApiUtil.respond(RequestService.upsertPledge(app.core().user.getCurrentUser(request),
    request.params.reqId , request.body), 
    response);          

}

function getPledges(request, response){
    ApiUtil.respond(RequestService.getPledges(app.core().user.getCurrentUser(request),
    request.params.reqId), 
    response);          

}

function getUserPledges(request, response){
    ApiUtil.respond(RequestService.getUserPledges(app.core().user.getCurrentUser(request),
    request.params.userId), 
    response);          

}

function getAllRequests(request, response) {
    ApiUtil.respond(RequestService.getAllRequests(null,
        request.query), 
    response);          
}

module.exports = {
    init: (services) => {
        services.express.post('/requests' , createRequest) ; 
        services.express.post('/requests/:reqId/pledges' , upsertPledge) ;
        services.express.get('/requests/:reqId/pledges' , getPledges) ;
        services.express.get('/requests/:reqId' , getRequest) ; 
        services.express.post('/requests/:reqId' , updateRequest) ; 
        services.express.get('/requests' , getAllRequests)
        services.express.get('/pledges/:userId' , getUserPledges)
    }
}