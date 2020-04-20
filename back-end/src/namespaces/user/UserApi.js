
const userService = require('./UserService');
const objectUtil = require('../../utils/ObjectUtil');
const apiUtil = require('../../utils/ApiUtil');

const PROFILE_UPDATEABLE_FIELDS = ["orgName", "orgDescription", "orgCity", "orgProvince", "orgType" , "orgPhone"];

let init = (services) => {
    services.express.post('/login', login);
    services.express.post('/register', register);
    services.express.get('/user/profile', getProfile);
    services.express.post('/user/profile', saveProfile);

    services.express.post('/admin/users', getAllUsers);
    services.express.post('/admin/users/:userId', updateUser);
}

let getCurrentUser = (request) => {
    return userService.getCurrentUser(request.header('Authorization'));
}

let login = (request, response) => {
    let loginResult = userService.login(request.body.username,
        request.body.password, request.body.verificationCode);
    apiUtil.respond(loginResult, response);
}

let register = (request, response) => {
    let u = userService.register(request.body);
    apiUtil.respond(u, response);
}

let getProfile = (request, response) => {
    apiUtil.respond(userService.getProfile(getCurrentUser(request)), response);
}

let saveProfile = (request, response) => {
    let wrapper = objectUtil.objectFilter(request.body,
        PROFILE_UPDATEABLE_FIELDS
    );
    apiUtil.respond(userService.saveProfile(getCurrentUser(request), wrapper), response);

}

let getAllUsers = (request, response) => {
    apiUtil.respond(userService.getAllUsers(getCurrentUser(request)), response);
}

let updateUser = (request, response) => {
    apiUtil.respond(userService.updateUser(getCurrentUser(request),
        request.params.userId,
        request.body), response);
}

module.exports = {
    init: init,
    getCurrentUser: getCurrentUser,
}


