import Communicator from "./Communicator";
let ProfileService = function() {
    return {
        getProfile : async () => {
            return Communicator.get('/user/profile' , {}); 
        },

        saveProfile : async (profile) => {
            console.log('Saving Profile' , profile)
            return Communicator.post('/user/profile' , profile) ; 
        }
    };
}() ; 

export default ProfileService ; 