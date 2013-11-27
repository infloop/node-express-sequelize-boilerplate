/**
 * This module represents all resources related to users
 */
var constants = require("../../config/constants");
var userBusiness = require("../business/UserBusiness");

/**
 * Following are the routes for document types
 * @param {Express} app the app element from express
 */
module.exports = function (app) {

	//all users
	app.get("/"+constants.routes.users, userBusiness.all);

};