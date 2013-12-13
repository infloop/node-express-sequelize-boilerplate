var logger = require("../../config/logger");

var publicRoutes = require("./PublicRoutes");
var userRoutes = require("./UserRoutes");
var roleRoutes = require("./RoleRoutes");
var authorization = require("../auth/Authorization");

/**
 * Main function to bootstrap all routes of this app
 */
module.exports = function (app, passport) {

	publicRoutes(app, passport);

    /*
     *  Check the user is logged in and has the required permissions for every request
     *  except for the public routes above.
     */
    app.all('*', [authorization.requiresLogin, authorization.checkIsAuthorizedToAccess]);

	//user specific routes
	userRoutes(app, passport);

	//role specific routes
	roleRoutes(app, passport);
}
