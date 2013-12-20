/**
 * This module represents all resources related to users
 */
var routesConstants = require("../../config/routesConstants");
var userBusiness = require("../business/UserBusiness");
var authorization = require("../auth/Authorization");

/**
 * Following are the routes for users
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {

    var routes = routesConstants.getRoutes();

	//all users
	app.get(routes.users, userBusiness.all);

	//new user
	app.post(routes.users, userBusiness.create);

    // Get a specific user.
    app.get(routes.specificUSer, userBusiness.getUserById);

    // Update the information of a given user.
    app.put(routes.specificUSer, userBusiness.updateUserById);

    // Delete a specific user.
    app.delete(routes.specificUSer, userBusiness.deleteUserById);
};
