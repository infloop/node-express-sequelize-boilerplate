var logger = require("../../config/logger");
var LocalStrategy = require('passport-local').Strategy;
var repositoryFactory = require("../repository/RepositoryFactory");
var constants = require("../../config/constants");


module.exports = function (passport, config, app) {

	// use local strategy
	passport.use(new LocalStrategy({passReqToCallback: true},

		function(req, username, password, done) {

			var userRepository = repositoryFactory.getUserRepository(app);
			var userTokenRepository = repositoryFactory.getUserTokenRepository(app);
			
			var type = constants.client.web;
			if(req.body.type){
				type = constants.client.mobile;
			}

			//local variable to store the successfully logged in user
			var loggedInUser = false;

			//callback called after the token is generated
			var successGeneratingToken = function(token){
				return done(null, loggedInUser);
			}

			//callback called after trying to generate the token
			var errorGeneratingToken = function(error){
				logger.error("LocalStrategy - database error generating token");
				return done(error);
			}

			//called after searching by username for the user in db
			var success = function(user){
				
				if(!user){
					logger.error("LocalStrategy - user not found");
					return done(null, false, { message: 'User not found' });
				}

				var encryptedPassword = user.encryptPassword(password);

				if(encryptedPassword === user.password){

					logger.info("LocalStrategy - successful login. Generating token ....");

					loggedInUser = user;

					//create token
					userTokenRepository.createTokenForUser(loggedInUser.id, type, successGeneratingToken, errorGeneratingToken);

					return;
				}
					
				logger.error("LocalStrategy - password does not match");
				return done(null, false, { message: 'Invalid password' });
			}

			//database error verifying user in login
			var error = function(error){
				logger.error("LocalStrategy - database error when loggin in");
				return done(error);
			}

			userRepository.findByUsername(username, success, error);
		}
	));
};
