require('dotenv').config();

module.exports =  function() {

    return Promise.resolve({
        express: {
            port: process.env.PORT || 5000 , 
            frontDir: process.env.FRONT_DIR , 
        }, 
        mongo: {
            uri: process.env.MONGO_URI , 
            database:  process.env.MONGO_DB || 'coronadev'
        },
        user: {
            jwtSecret: process.env.MONGO_DB || 'MY_DEV_SECRET' 
        }
    });
}