const jwt = require('jsonwebtoken') ;
const app = require('../../app')
function calculateHash(password, salt) {
    return password ; 
}

module.exports = { 
    login: async (username, password) => {
        let dbUser = await app.core().mongo.db().collection('users').findOne({username: username});
        console.log('Dbuser' , dbUser); 
        if (dbUser !== null ) {
            if (calculateHash(password, dbUser.slat) ===  dbUser.password) {
                let userObject =  {
                    username: username, 
                    name: dbUser.name, 
                    roles: dbUser.roles 
                }  ;
                let jwtToken ;  
                try {
                     jwtToken = jwt.sign(userObject , app.core().env.user.jwtSecret);
                    console.log({...userObject , jwt: jwtToken})
                }catch(err) {
                    console.log('failed to sign:' , userObject ,err); 
                }
                return Promise.resolve({...userObject , jwt: jwtToken}) ; 
            } else {
                console.log(calculateHash(password, dbUser.slat),  dbUser.password);
            }
        } 
        return Promise.reject('Invalid username/password') ; 
    } , 

    register: async (username, password, name) => {
        console.log('Registring:', username , password , name)
        let dbUser = await app.core().mongo.db().collection('users').findOne({username: username});
        
        if (dbUser !== null) {
            console.log('User Already Exists:' , dbUser); 
            return Promise.reject("User Already Exist") ;
        }        
        
        return app.core().mongo.db().collection('users').insertOne({
            username: username, 
            name: name, 
            salt: username, 
            password : calculateHash(password, username) , 
            roles: []
        }).then(() => this.login(username, password)) ;  
        
    }
}