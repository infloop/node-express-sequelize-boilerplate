
var repositoryFactory = require("../repository/RepositoryFactory");

module.exports = function (passport, config, app) {

	var userRepository = repositoryFactory.getUserRepository(app);

	//local
	require("./LocalStrategy")(passport, config, app);

};