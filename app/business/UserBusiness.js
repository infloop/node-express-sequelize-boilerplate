var logger = require("../../config/logger");
var constants = require("../../config/constants");
var repositoryFactory = require("../repository/RepositoryFactory").getRepositoryFactory();
var authorization = require("../auth/Authorization");
// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];

var userResource = require("../resource/UserResource");
var permissionResource = require("../resource/PermissionResource");

/**
 * This method returns (in the response) all users
 */
module.exports.all = function(req, res){

    var userRepository = repositoryFactory.getUserRepository();

    var offset = (req.param('offset') > 0 ? req.param('offset') : 1) - 1;
    var limit = (req.param('limit') > 0 ? req.param('limit') : constants.limit);

    var success = function(result) {
        result.offset = offset;
        result.limit = limit;
        res.status(200).json(userResource.buildList(result));
    }

    var error = function(err) {
        res.status(500).json(err);
    }
    

    var options = {
        offset: offset,
        limit: limit
    }

    var username = req.param("username");
    if(username){
        options.username = username;
    }

    var email = req.param("email");
    if(email){
        options.email = email;
    }

    userRepository.getAllUsers(options, success, error);
}

/**
 * 
 */
module.exports.doLogin = function(req, res) {

    logger.debug("Inicio - doLogin "+req.user.username);

    var userTokenRepository = repositoryFactory.getUserTokenRepository();

    var success = function(token){
        if(token){
            return res.json(token.token);        
        }

        return res.status(401).json("Token not found");
    }

    var error = function(error){
        res.status(500).json(error);
    }

    userTokenRepository.findLastValidTokenByUser(req.user.id, success, error);

    logger.debug("Fin - doLogin");
}

/**
 * Logs out the user from app
 */
module.exports.doLogout = function(req, res){

    var userTokenRepository = repositoryFactory.getUserTokenRepository(req.app);

    var tokenFromRequest = authorization.getTokenFromRequest(req);

    var successFind = function(token){
        
        if(token){
            var type = authorization.getTokenType(req);

            //then delete all tokens of the same type for the current user
            userTokenRepository.deleteAllTokensSameType(token.userId, type);
        }
    }

    var errorFind = function(error){
        res.status(500).json(error);
    }

    //first find the token
    userTokenRepository.findByToken(tokenFromRequest, successFind, errorFind);
}

/*
 * Creates a new user
 */
module.exports.create = function(req, res){

    var userRepository = repositoryFactory.getUserRepository();

    var success = function(user){
        res.status(201).json(user);
    }

    var error = function(error){
        logger.error(error);
        res.status(500).json(error);
    }

    //encrypt password
    var userEntry = userRepository.build(req.body);

    var encryptedPassword = userEntry.encryptPassword(userEntry.password);
    userEntry.setDataValue('password', encryptedPassword);

    userEntry.save().success(success).error(error);
}

/*
 * Gets the role of a user by the token it sends in the http headers.
 */
module.exports.getUserRoleByToken = function(req, res) {

    var tokenSuccess = function(userToken) {

        if (userToken) {

            logger.debug(userToken);

        } else {

            tokenError("No se encontró el token");
        }
    };

    var tokenError = function(error) {
        logger.debug("*************** error: " + error);
    };

    var sequelizeRepository = repositoryFactory.getSequelizeRepository();
    sequelizeRepository.findRoleByToken(tokenSuccess, tokenError);
}

module.exports.getUserById = function(req, res) {

    var success = function(user) {
        res.status(200).json(user);
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var userRepository = repositoryFactory.getUserRepository();
    userRepository.findById(req.params.id, success, error);
}

module.exports.updateUserById = function(req, res) {

    var success = function(user) {
        res.status(200).json(user);
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var userRepository = repositoryFactory.getUserRepository();
    userRepository.updateById(req.params.id, req.body, success, error);
}

module.exports.deleteUserById = function(req, res) {

    var success = function(user) {
        res.status(200).json(user);
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var userRepository = repositoryFactory.getUserRepository();
    userRepository.deleteById(req.params.id, success, error);
}
