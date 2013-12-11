var userRoutes = require("./UserRoutes");
var roleRoutes = require("./RoleRoutes");
var logger = require("../../config/logger");


var authorization = require("../auth/Authorization");

/**
 * Main function to bootstrap all routes of this app
 */
module.exports = function (app, passport) {

	//index page - requires authorization
	app.get("/", 
			
			authorization.requiresLoginAndRedirect,
            //authorization.checkIsAuthorizedToAccess,
			
			function(req, res){

				logger.debug("Auth user is: "+req.loggedInUser+" !!!!!");
				res.render('index');
			}
	);

	//login page => public
	app.get("/login", 

			function(req, res){
				res.render('login');
			}
	);

	//user specific routes
	userRoutes(app, passport);

	//role specific routes
	roleRoutes(app, passport);

}
