var logger = require("../../config/logger");
var LocalStrategy = require('passport-local').Strategy;
var repositoryFactory = require("../repository/RepositoryFactory");


module.exports = function (passport, config, app) {

	// use local strategy
	passport.use(new LocalStrategy(

		function(username, password, done) {

			logger.debug("LocalStrategy - init");

			var userRepository = repositoryFactory.getUserRepository(app);

			var success = function(user){
				
				if(!user){
					logger.error("LocalStrategy - user not found");
					return done(null, false, { message: 'User not found' });
				}

				var encryptedPassword = user.encryptPassword(password);

				if(encryptedPassword == user.password){
					logger.info("LocalStrategy - successful login");
					return done(null, user);
				}else{
					logger.error("LocalStrategy - password does not match");
					return done(null, false, { message: 'Invalid password' });
				}
			}

			var error = function(error){
				logger.error("LocalStrategy - database error when logging in");
				return done(error);
			}

			userRepository.findByUsername(username, success, error);
		}
	));

};