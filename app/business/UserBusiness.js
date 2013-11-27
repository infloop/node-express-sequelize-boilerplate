var logger = require("../../config/logger");
var constants = require("../../config/constants");
var repositoryFactory = require("../repository/RepositoryFactory");

/**
 * This method returns (in the response) all users
 */
module.exports.all = function(req, res){
	
	var userRepository = repositoryFactory.getUserRepository(req);

	var success = function(result){
		res.send(result);
	}

	var error = function(err){
		res.status(500).send(err);
	}

	var offset = (req.param('offset') > 0 ? req.param('offset') : 1) - 1;
	var limit = (req.param('limit') > 0 ? req.param('limit') : constants.limit);

	var options = {
		offset: offset,
		limit: limit
	}

	userRepository.all(options, success, error);

}