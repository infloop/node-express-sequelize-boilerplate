var logger = require("../../config/logger");
var constants = require("../../config/constants");
var repositoryFactory = require("../repository/RepositoryFactory");

/**
 * This method returns (in the response) all users
 */
module.exports.all = function(req, res){
	
	var userRepository = repositoryFactory.getUserRepository(req.app);

	var success = function(result){
		res.json(result);
	}

	var error = function(err){
		res.status(500).json(err);
	}

	var offset = (req.param('offset') > 0 ? req.param('offset') : 1) - 1;
	var limit = (req.param('limit') > 0 ? req.param('limit') : constants.limit);

	var options = {
		offset: offset,
		limit: limit
	}

	userRepository.all(options, success, error);

}

/**
 * This method return to the previous page, before login.
 * If no previous page exists, then redirect to index page
 */
module.exports.doLogin = function(req, res){
	logger.debug("Inicio - doLogin");
	if (req.session.returnTo) {
	    res.redirect(req.session.returnTo)
	    delete req.session.returnTo
	    return
	}
	res.redirect('/')
	logger.debug("Fin - doLogin");
}

/*
 * Creates a new user
 */

module.exports.create = function(req, res){
	
	var userRepository = repositoryFactory.getUserRepository(req.app);

	var success = function(user){
		res.json(user);
	}

	var error = function(error){
		logger.error(error);
		res.status(500).json(err);
	}

	//encrypt password
	var userEntry = userRepository.build(req.body);
	 logger.debug("userEntry:"+userEntry.password);

	var encryptedPassword = userEntry.encryptPassword(userEntry.password);
	userEntry.setDataValue('password', encryptedPassword);

	logger.debug("userEntry2:"+userEntry.password);

	userEntry.save().success(success).error(error);

}