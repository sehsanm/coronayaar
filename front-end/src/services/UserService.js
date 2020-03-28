import Communicator from "./Communicator";
let ProfileService = function() {
    let ret =  {
        getProfile : async () => {
            return Communicator.get('/user/profile' , {}); 
        },

        saveProfile : async (profile) => {
            console.log('Saving Profile' , profile)
            return Communicator.post('/user/profile' , profile) ; 
        },

        getAllUsers : async (filter) => {
            return Communicator.post('/admin/users' , filter) ; 
        }, 

        updateUser: async (user) => {
            return Communicator.post(`/admin/users/${user._id}` , user)
        },

    };

    ret.approveUser =  async (userId) => {
        return ret.updateUser({_id:userId , status: 'approved'}) ; 
    }

    ret.rejectUser = async (userId) => {
        return ret.updateUser({_id:userId , status: 'rejected'}) ; 
    }   

    ret.addRole = async (userInfo , role) => {
        console.log('Add role: ' , role);
        let nr = userInfo.roles ||  [] ;
        if (nr.indexOf(role) == -1)
            nr.push(role) ;   

        return ret.updateUser({_id:userInfo._id , roles : nr }) ; 
    }   

    ret.removeRole = async (userInfo , role) => {
        console.log('Remove role:' , role); 
        let nr = userInfo.roles ||  [] ;
        nr = nr.filter((r)=> r !== role) ;       
        return ret.updateUser({_id:userInfo._id , roles : nr }) ; 
    }   

    return ret;  

}() ; 

export default ProfileService ; 