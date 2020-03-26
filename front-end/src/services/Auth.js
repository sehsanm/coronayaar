import Communicator from './Communicator'

var AuthInfo = function(userInfo) { 
    var ret = {} ; 

    ret.isAuthenticated = function() { 
        return userInfo !== null ; 
    }

    ret.user = userInfo ;

    return ret 
 
}

var auth = AuthInfo({
    username: "Ehsan",
    name : "Mahmoudi" , 
    roles : [] ,
    jwt : "1234" 
}) ; 

var unAuth = AuthInfo(null) ; 

var authProvider = function() {
    let currentAuth = unAuth ; 
    return {
        getAuth : () => currentAuth , 
        authenticate : (username, password) => {
            return Communicator.post('/login' 
                ,{username: username , password: password})
                .then((result)=>{
                    currentAuth = auth ;   
                }).catch((error) => console.log(error));     
        }, 
        register : (username, password , name) => {
            return Communicator.post('/signup',
                {
                    username: username, 
                    password: password,
                    name: name  
                })
                .then((result)=>{
                    currentAuth = result  
                }).catch((error) => console.log(error));     
        }
    } ; 
}();


export default authProvider; 



