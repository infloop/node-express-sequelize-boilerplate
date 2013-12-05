
var repositoryFactory = require("../repository/RepositoryFactory");

module.exports = function (passport, config, app) {

	var userRepository = repositoryFactory.getUserRepository(app);

	// serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id)
	})

	passport.deserializeUser(function(id, done) {

		var success = function(user){
			done(null, user);
		}

		var error = function(error){
			done(error, null);
		}

		userRepository.find({ id: id }).success(success).error(error);
	});

	//local
	require("./LocalStrategy")(passport, config, app);

};