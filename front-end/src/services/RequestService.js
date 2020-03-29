import Communicator from "./Communicator";
let ProfileService = function() {
    let ret =  {};

    ret.saveRequest =  async (request) => {
        return Communicator.post('/request' , request) ; 
    }

    ret.updateRequest =  async (requestId, request) => {
        return Communicator.post(`/request/${requestId}` ,request) ; 
    }

    ret.getAllRequests =  async () => {
        return Communicator.get(`/request`) ; 
    }

    return ret;  

}() ; 

export default ProfileService ; 