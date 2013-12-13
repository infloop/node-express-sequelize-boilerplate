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

function isAuthorized(permissionList, httpVerb, uri) {

    permissionList.forEach(function (permission) {

        logger.debug(permission);
    });
}

exports.checkIsAuthorizedToAccess = function(req, res, next) {

    var token = req.signedCookies[config.app.cookieName];
    var route = req.route;
    var httpVerb = route.method;
    var uri = req.path;

    var roleSuccess = function(roleResult) {

        var permissionSuccess = function(permissionList, httpVerb, uri) {

            if (permissionList) {

                if (isAuthorized(permissionList, httpVerb, uri)) {

                    // enviar la respuesta
                    // Cual es la respuesta que se debe enviar? 
                    // Un redirect, dejandolo pasar a donde hace el request.
                    // O mejor el resultado del request? (voto por esta).
                    req.status(200); // Cambiar.

                } else {

                    error401(res, "No autorizado");
                }

            } else {

                // The given role does not conatin permissions.
                error401(res, "No autorizado");
            }
        };

        var permissionError = function(error) {

            error401(res, "No autorizado");
        };

        if (roleResult) {

            var permissionRepository = repositoryFactory.getPermissionRepository(req.app);
            permissionRepository.findPermissionsByRole(roleResult, permissionSuccess, permissionError);

        } else {

            // No debería entrar aqui.
            var message = 'No hay existe un rol correspondiente al token:';
            res.status(500).json(message);
        }
    };

    var roleError = function(roleErrorMessage) {

        logger.debug("roleError: " + roleErrorMessage);
    };

    var sequelizeRepository = repositoryFactory.getSequelizeRepository(req.app);
    sequelizeRepository.findRoleByToken(token, roleSuccess, roleError);

    // Donde pongo el next? si lo pongo aqui me sale el error: 
    // "No se pueden agregar headers una vez se ha enviado la respuesta."
    // next(); 
}
