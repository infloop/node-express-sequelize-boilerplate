var logger = require("../../config/logger");

var publicRoutes = require("./PublicRoutes");
var userRoutes = require("./UserRoutes");
var roleRoutes = require("./RoleRoutes");
var tokenRoutes = require("./TokenRoutes");
var authorization = require("../auth/Authorization");
var constants = require("../../config/constants");

/**
 * Main function to bootstrap all routes of this app
 */
module.exports = function (app, passport) {

	
	app.all('*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With, "+constants.tokenHeader);
	  next();
	});
	

	publicRoutes(app, passport);

    /*
     *  Check the user is logged in and has the required permissions for every request
     *  except for the public routes above.
     */
    //app.all('*', [authorization.requiresLogin, authorization.checkIsAuthorizedToAccess]);

	//user specific routes
	userRoutes(app, passport);

	//role specific routes
	roleRoutes(app, passport);

	//token specific routes
	tokenRoutes(app, passport);
}
