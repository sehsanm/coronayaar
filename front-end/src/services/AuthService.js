import Communicator from './Communicator'

var AuthInfo = function(userInfo) { 
    var ret = {} ; 

    ret.isAuthenticated = function() { 
        return userInfo !== null ; 
    }

    ret.isAdmin = function() {
        if (ret.user.roles !== null && ret.user.roles.indexOf('admin') >= 0 )
            return true ; 
        return false ; 
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
    let currentAuth ;
    if (localStorage.getItem('token') !== null) {
        currentAuth = AuthInfo(JSON.parse(localStorage.getItem('token'))); 
    } else {
        currentAuth = unAuth ; 
    }
    return {
        getAuth : () => currentAuth , 
        login : (username, password) => {
            return Communicator.post('/login' 
                ,{username: username , password: password})
                .then((result)=>{
                    console.log('xxx' , result.data) ; 
                    currentAuth = AuthInfo(result.data) ;
                    localStorage.setItem('token' , JSON.stringify(result.data)) ;    
                });     
        }, 
        register : (username, password , name) => {
            return Communicator.post('/register',
                {
                    username: username, 
                    password: password,
                    name: name  
                })
                .then((result)=>{
                    currentAuth = result  
                });     
        }, 
        logout : () => {
            localStorage.removeItem('token') ; 
            currentAuth = unAuth ; 
        }
    } ; 
}();


export default authProvider; 



