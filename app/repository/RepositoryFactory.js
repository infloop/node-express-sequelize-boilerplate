var logger = require("../../config/logger");

/**
 * This method returns the user repository
 */
module.exports.getUserRepository = function(app){
	return require("../repository/UserRepository")(app.get("models").User);
};

/**
 * This method returns the role repository
 */
module.exports.getRoleRepository = function(app){
	return require("../repository/RoleRepository")(app.get("models").Role);
};

/**
 * This method returns the permission repository
 */
module.exports.getPermissionRepository = function(app){
	return require("../repository/PermissionRepository")(app.get("models").Permission);
};

/**
 * This method returns the userToken repository
 */
module.exports.getUserTokenRepository = function(app){
	return require("../repository/UserTokenRepository")(app.get("models").UserToken);
};