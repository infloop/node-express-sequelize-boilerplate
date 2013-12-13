/**
 * This module handles all the public access routes.
 */
var logger = require("../../config/logger");
var authorization = require("../auth/Authorization");
var userBusiness = require("../business/UserBusiness");

/**
 * Following are the routes for roles
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {

    //index page - requires authorization
	app.get("/", authorization.requiresLoginAndRedirect, function(req, res) {
        
        logger.debug("Auth user is: "+req.loggedInUser+" !!!!!");
        res.render('index');
    });

	app.get("/login", function(req, res){
        res.render('login');
    });

    app.post("/api/users/login", passport.authenticate('local', { session: false }),
			userBusiness.doLogin);
};
