const jwt = require('jsonwebtoken') ;
const app = require('../../app');
const objectUtil = require('../../utils/ObjectUtil');
ObjectID = require('mongodb').ObjectID ; 

function calculateHash(password, salt) {
    return password ; 
}

module.exports = { 
    getCurrentUser:  (token) => {
        jwtToken = jwt.verify(token , app.core().env.user.jwtSecret);
        console.log('Current user is:' , jwtToken.username); 
        return jwtToken ; 

    }, 

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
            roles: [] , 
        }).then(() => this.login(username, password)) ;  
        
    }, 


    getProfile: async (userJWT) => {
        return  app.core().mongo.db().collection('users').findOne({username: userJWT.username}).then((rec)=>{            
            return rec.profile || {}  ; 
        }); 
    },

    saveProfile: async (userJWT, profile) =>{
        console.log('Updating profile for ' , userJWT , profile) ; 
        return dbUser = await app.core().mongo.db().collection('users').updateOne(
            {username: userJWT.username} , 
            {
                $set: {
                    profile : profile 
                }
            });
    },

    getAllUsers: (userJWT, filter) => {
        console.log('Get All Users'); 
        return new Promise((resolve, reject) => {
            app.core().mongo.db().collection('users').find({}).toArray((err, docs)=>{
                if (err){
                    reject(err) ;
                    return; 
                } 
                const fields = [ 'username' , 'name' , 'profile' , 'status' ,'_id' ,"roles"] ; 
                resolve(docs.map((item)=> objectUtil.objectFilter(item, fields)));             
            });    
        })
    }, 
    
    updateUser: (userJWT, userId , user)=>{
        console.log(user , userId , objectUtil.objectFilter(user, ["status", "name" , "roles"])) ; 
        return app.core().mongo.db().collection('users').updateOne({_id: ObjectID(userId)} , {
            $set : objectUtil.objectFilter(user, ["status", "name" , "roles"])
        } );    
    }


}