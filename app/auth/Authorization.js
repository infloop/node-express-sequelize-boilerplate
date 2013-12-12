var logger = require("../../config/logger");
var repositoryFactory = require("../repository/RepositoryFactory");
// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];

var error401 = function(res, error) {

    var response = {
        error: error,
        loginUrl: "/login"
    }

    return res.status(401).json(response);
}

/*
 *  Generic require login routing middleware. Redirects to
 * /login if no cookie found
 */
exports.requiresLoginAndRedirect = function (req, res, next) {

    var userTokenRepository = repositoryFactory.getUserTokenRepository(req.app);

    //get the cookie
    var cookie = req.signedCookies[config.app.cookieName];

    var error = function(error){
        req.session.returnTo = req.originalUrl
        return res.redirect('/login');
    }

    if(!cookie){		
        return error("No autorizado.");	
    }

    var success = function(token){
        req.loggedInUser = token.userId;

        //update token
        userTokenRepository.updateTokenExpiration(cookie);

        next();
    }

    //find token
    userTokenRepository.findByToken(cookie, success, error);
}

/*
 *  Generic require login routing middleware. Redirects to
 * /login if no cookie found
 */
exports.requiresLogin = function (req, res, next) {

    var userTokenRepository = repositoryFactory.getUserTokenRepository(req.app);

    //get the cookie
    var cookie = req.signedCookies[config.app.cookieName];

    if(!cookie){		
        return error401(res, "No autorizado");	
    }

    var success = function(token){
        if(token){
            req.loggedInUser = token.userId;

            //update token
            userTokenRepository.updateTokenExpiration(cookie);

            return next();
        }

        return error401(res, "No autorizado");
    }

    //find token
    userTokenRepository.findByToken(cookie, success, error401);
}

exports.checkIsAuthorizedToAccess = function(req, res, next) {

    var token = req.signedCookies[config.app.cookieName];
    logger.debug("TOKEN: " + token);

    var roleSuccess = function(roleResult) {

        logger.debug("roleSuccess: " + roleResult);
    };

    var roleError = function(roleErrorMessage) {

        logger.debug("roleError: " + roleErrorMessage);
    };

    var sequelizeRepository = repositoryFactory.getSequelizeRepository(req.app);
    sequelizeRepository.findRoleByToken(token, roleSuccess, roleError);

    var route = req.route;
    var method = route.method;
    var uri = req.path;

    if (method === 'get') {

        logger.debug("uri: " + uri);

        if (uri == '/api/roles') {

            error401(res, "No autorizado");
        }
    }

    next();
}
