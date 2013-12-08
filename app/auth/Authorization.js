
var logger = require("../../config/logger");
var repositoryFactory = require("../repository/RepositoryFactory");
// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];
/*
 *  Generic require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {

	var userTokenRepository = repositoryFactory.getUserTokenRepository(req.app);
  	
  	//get the cookie
	var cookie = req.signedCookies[config.app.cookieName];

	var error = function(error){
		req.session.returnTo = req.originalUrl
    	return res.redirect('/login');
	}

	if(!cookie){		
		return error("No autorizado.");	
	}

	var success = function(token){
		req.loggedInUser = token.userId;

		//update token
  		userTokenRepository.updateTokenExpiration(cookie);

		next();
	}
	
	//find token
  	userTokenRepository.findByToken(cookie, success, error);
}