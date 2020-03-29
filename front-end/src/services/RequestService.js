import Communicator from "./Communicator";
let ProfileService = function() {
    let ret =  {};

    ret.saveRequest =  async (request) => {
        return Communicator.post('/request' , request) ; 
    }

    ret.updateRequest =  async (requestId, request) => {
        return Communicator.post(`/request/${requestId}` ,request) ; 
    }

    ret.getAllRequests =  async (filter) => {
        return Communicator.get(`/request` , filter ) ; 
    }

    return ret;  

}() ; 

export default ProfileService ; 