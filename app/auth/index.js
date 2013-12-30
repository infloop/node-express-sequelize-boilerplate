var repositoryFactory = require("../repository/RepositoryFactory").getRepositoryFactory();

module.exports = function (passport, config, app) {

	var userRepository = repositoryFactory.getUserRepository();

	//local
	require("./LocalStrategy")(passport, config, app);
};
