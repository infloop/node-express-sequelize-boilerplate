/**
 * This module represents all routes related to roles
 */
var constants = require("../../config/constants");
var roleBusiness = require("../business/RoleBusiness");
var authorization = require("../auth/Authorization");

/**
 * Following are the routes for roles
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {

	//all roles
	app.get("/"+constants.routes.roles, 
			roleBusiness.all);

	app.put("/"+constants.routes.roles,
			roleBusiness.create);

};