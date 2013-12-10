/**
 * This module represents all resources related to users
 */
var constants = require("../../config/constants");
var userBusiness = require("../business/UserBusiness");
var authorization = require("../auth/Authorization");

/**
 * Following are the routes for users
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {

	//all users
	app.get("/"+constants.routes.users, 
			authorization.requiresLogin,
			userBusiness.all);

	//new user
	app.put("/"+constants.routes.users,
			userBusiness.create);

	//login
	app.post("/"+constants.routes.login, 
			passport.authenticate('local', { session: false }),
			userBusiness.doLogin);

	//logout
	app.get("/"+constants.routes.logout,
			userBusiness.doLogout);

};
