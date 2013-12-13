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

    var routes = constants.getRoutes();

	//all users
	app.get(routes.users, userBusiness.all);

	//new user
	app.put(routes.users, userBusiness.create);

	//login
	app.post(routes.userLogin, passport.authenticate('local', { session: false }),
			userBusiness.doLogin);

	//logout
	app.get(routes.userLogout, userBusiness.doLogout);
};
