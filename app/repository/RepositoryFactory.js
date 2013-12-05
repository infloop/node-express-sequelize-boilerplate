var logger = require("../../config/logger");
var constants = require("../../config/constants");

/**
 * This method returns the user repository
 */
module.exports.getUserRepository = function(app){
	return require("../repository/UserRepository")(app.get("models").User);
};