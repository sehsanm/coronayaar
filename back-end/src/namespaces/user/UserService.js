const jwt = require("jsonwebtoken");
const app = require("../../app");
const objectUtil = require("../../utils/ObjectUtil");
ObjectID = require("mongodb").ObjectID;
const PUBLIC_FIELDS = ["username", "name", "profile", "status", "_id", "roles"];

function calculateHash(password, salt) {
  return password;
}

function getCollection() {
  return app
    .core()
    .mongo.db()
    .collection("users");
}
module.exports = {
  getCurrentUser: token => {
    jwtToken = jwt.verify(token, app.core().env.user.jwtSecret);
    console.log("Current user is:", jwtToken.username);
    return jwtToken;
  },

  login: async (username, password) => {
    let dbUser = await getCollection().findOne({ username: username });
    console.log("Dbuser", dbUser);
    if (dbUser !== null) {
      if (calculateHash(password, dbUser.slat) === dbUser.password) {
        let userObject = objectUtil.objectFilter(dbUser, PUBLIC_FIELDS);
        let jwtToken;
        try {
          jwtToken = jwt.sign(userObject, app.core().env.user.jwtSecret);
          console.log({ ...userObject, jwt: jwtToken });
        } catch (err) {
          console.log("failed to sign:", userObject, err);
        }
        return Promise.resolve({ ...userObject, jwt: jwtToken });
      } else {
        console.log(calculateHash(password, dbUser.slat), dbUser.password);
      }
    }
    return Promise.reject("Invalid username/password");
  },

  register: async (username, password, name) => {
    console.log("Registring:", username, password, name);
    let dbUser = await app
      .core()
      .mongo.db()
      .collection("users")
      .findOne({ username: username });

    if (dbUser !== null) {
      console.log("User Already Exists:", dbUser);
      return Promise.reject("User Already Exist");
    }
    return getCollection()
      .insertOne({
        username: username,
        name: name,
        salt: username,
        password: calculateHash(password, username),
        roles: []
      })
      .then(() => this.login(username, password));
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

  getAllUsers: (userJWT, filter) => {
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
    return getCollection().updateOne(
      { _id: ObjectID(userId) },
      {
        $set: objectUtil.objectFilter(user, ["status", "name", "roles"])
      }
    );
  }
};