var logger = require("../../config/logger");
var constants = require("../../config/constants");

/**
 * This method returns the user repository
 */
module.exports.getUserRepository = function(req){
	return require("../repository/UserRepository")(req.app.get("models").User);
};