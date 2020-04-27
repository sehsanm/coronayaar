const jwt = require("jsonwebtoken");
const app = require("../../app");
const objectUtil = require("../../utils/ObjectUtil");
const apiUtil = require("../../utils/ApiUtil");
ObjectID = require("mongodb").ObjectID;

const PUBLIC_FIELDS = ["username", "name", "profile", "status", "_id", "roles", "phoneApproved"];
const REGISTER_FIELDS = ["username", "name", "password", "nationalCode"];
const VERIFICATION_REQUIRED = 'VERIFICATION_REQUIRED';

function calculateHash(password, salt) {
  return password;
}

function getCollection() {
  return app
    .core()
    .mongo.db()
    .collection("users");
}

function assertRole(jwtToken, role) {
  if (jwtToken.roles.indexOf(role) == -1)
    throw apiUtil.Errors.Security('User does not have the role' + role);
}

async function login(username, password, verificationCode) {
  let dbUser = await getCollection().findOne({ username: username });
  if (dbUser !== null) {
    if (calculateHash(password, dbUser.slat) === dbUser.password) {
      let userObject = objectUtil.objectFilter(dbUser, PUBLIC_FIELDS);
      let jwtToken;
      try {
        jwtToken = jwt.sign(userObject, app.core().env.user.jwtSecret);

        if (dbUser.phoneApproved)
          return Promise.resolve({ ...userObject, jwt: jwtToken });
        else {
          if (verificationCode && verificationCode === dbUser.verificationCode) {
            await getCollection().updateOne({ username: username }, { $set: { phoneApproved: true } })
            return Promise.resolve({ ...userObject, jwt: jwtToken });
          }
          return Promise.resolve({ status: 401, response: VERIFICATION_REQUIRED });
        }
      } catch (err) {
        console.log("Failed to sign:", userObject, err);
      }
    }
  }
  return Promise.reject(apiUtil.Errors.Security("Invalid Username or Password"));
}


module.exports = {
  PUBLIC_FIELDS: PUBLIC_FIELDS , 
  getCurrentUser: token => {
    try {
      jwtToken = jwt.verify(token, app.core().env.user.jwtSecret);
      return jwtToken;
    }catch(err) {
      return null ; 
    }
  },

  assertRole: assertRole,
  login: login,
  isAdmin: (jwt) => jwt.roles.indexOf('admin') >= 0, 
   
  register: async (userInfo) => {
    let u = objectUtil.objectFilter(userInfo, REGISTER_FIELDS);
    //TODO VALIDATE REGISTRATION
    let dbUser = await getCollection()
      .findOne({ username: u.username });

    if (dbUser !== null && dbUser.phoneApproved) {
      console.log("User Already Exists:", dbUser);
      return Promise.reject("User Already Exist");
    }

    let verifyCode = Math.floor(1000 + Math.random() * 9000) + '';

    let user = {
      ...u,
      salt: u.username,
      password: calculateHash(u.password, u.username),
      roles: [],
      status: 'pending',
      phoneApproved: false,
      verificationCode: verifyCode,
    }
    if (app.core().env.user.skipVerification) {
      user.phoneApproved = true ; 

    } else {
      let res = await app.core().sms.send("Your CoronaYaar Confirmation Code: " + verifyCode, u.username);
      console.log('SMS:' , res); 
    }
    //First user registration will be marked as admin 
    if (app.core().env.user.adminUsers.indexOf(u.username) !== -1) {
      user.roles = ['admin'];
    }

    if (dbUser) {
      //Allow re-register if the user phone is not verified yet!
      return getCollection()
      .updateOne( {_id : dbUser._id}, {$set: user} )
      .then(() => VERIFICATION_REQUIRED);      
    } else {
      return getCollection()
        .insertOne(user)
        .then(() => VERIFICATION_REQUIRED);
    }
  },

  getProfile: async userJWT => {
    return getCollection()
      .findOne({ username: userJWT.username })
      .then(rec => {
        return objectUtil.objectFilter(rec, PUBLIC_FIELDS);
      });
  },

  saveProfile: async (userJWT, profile) => {
    console.log("Updating profile for ", userJWT, profile);
    return (dbUser = await getCollection()
      .updateOne(
        { username: userJWT.username },
        {
          $set: {
            profile: profile
          }
        }
      ));
  },

  getAllUsers: async (userJWT, filter) => {
    assertRole(userJWT, 'admin');
    console.log("Get All Users");
    return new Promise((resolve, reject) => {
      getCollection()
        .find({})
        .toArray((err, docs) => {
          if (err) {
            reject(err);
            return;
          }
          const fields = [
            "username",
            "name",
            "profile",
            "status",
            "_id",
            "roles"
          ];
          resolve(docs.map(item => objectUtil.objectFilter(item, fields)));
        });
    });
  },

  updateUser: (userJWT, userId, user) => {
    console.log(
      user,
      userId,
      objectUtil.objectFilter(user, ["status", "name", "roles"])
    );
    if (userJWT._id !== userId) {
      //Only admin can change other users
      assertRole(userJWT, 'admin')
    }

    return getCollection().updateOne(
      { _id: ObjectID(userId) },
      {
        $set: objectUtil.objectFilter(user, ["status", "name", "roles"])
      }
    );
  }, 

  loadUsers:async (userJWT,  userIdList) => {
    return  getCollection().find({_id: {$in:userIdList}}).toArray() ;
  }
};
