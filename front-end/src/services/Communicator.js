import Auth from './Auth'
var Communicator = function() {
    return {
        post : (api , params) => {
            console.log(api , params); 
            return new Promise((resolve, reject)=> {resolve(params)}) ; 
        }
    }
}() ; 

export default Communicator ; 