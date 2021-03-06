import Auth from './AuthService'
import axios from 'axios'
var Communicator = function() {
    const endpoint = process.env.REACT_APP_API_ENDPOINT || "" ;

    return {
        post : (api , params) => {
            console.log(api , params);
            
            let headers = {} ; 
            if (Auth.getAuth().isAuthenticated()) {
                headers.Authorization = Auth.getAuth().user.jwt ;
            } 

            return axios.post(endpoint + api , params, {
                headers : headers, 
                validateStatus: function (status) {
                    return status >= 200 && status < 300; // default
                  }
            }) ; 
        },

        get (api , params) { 
            console.log(api , params);
            
            let token ; 
            if (Auth.getAuth().isAuthenticated()) {
                token = Auth.getAuth().user.jwt ; 
            } 
            return axios.get(endpoint + api , {
                params: params, 
                headers : {
                    Authorization : token
                }, 
                validateStatus: function (status) {
                    return status >= 200 && status < 300; // default
                }
            }) ; 

        }
    }
}() ; 

export default Communicator ; 