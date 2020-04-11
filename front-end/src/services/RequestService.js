import Communicator from "./Communicator";
let ProfileService = function() {
    let ret =  {};

    ret.saveRequest =  async (request) => {
        return Communicator.post('/requests' , request) ; 
    }

    ret.updateRequest =  async (requestId, request) => {
        return Communicator.post(`/requests/${requestId}` ,request) ; 
    }

    ret.getAllRequests =  async (filter) => {
        return Communicator.get(`/requests` , filter ) ; 
    }

    ret.upsertPledge = async (requestId, pledge) => {

        return Communicator.post(`/requests/${requestId}/pledges` , pledge) ; 
    } 

    ret.getRequest = async (requestId) => {
        return Communicator.get(`/requests/${requestId}`); 
    }

    ret.getPledges = async (requestId) => {
        return Communicator.get(`/requests/${requestId}/pledges`); 
    }

    return ret;  

}() ; 

export default ProfileService ; 