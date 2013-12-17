/**
 * This module handles all the public access routes.
 */
var logger = require("../../config/logger");
var routesConstants = require("../../config/routesConstants");
var authorization = require("../auth/Authorization");
var userBusiness = require("../business/UserBusiness");

/**
 * Following are the routes for roles
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {

    var routes = routesConstants.getRoutes();

    //index page - requires authorization
	app.get("/", authorization.requiresLoginAndRedirect, function(req, res) {
        
        logger.debug("Auth user is: "+req.loggedInUser+" !!!!!");
        res.render('index');
    });

	app.get("/login", function(req, res){
        res.render('login');
    });

    //user is logged in
    app.get(routes.sessions, authorization.requiresLogin, function(req, res){
        res.json("OK");
    });

    //logout
    app.delete(routes.sessions, userBusiness.doLogout);

    app.post(routes.sessions, passport.authenticate('local', { session: false }),
			userBusiness.doLogin);
};
