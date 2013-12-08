var logger = require("../../config/logger");
var constants = require("../../config/constants");
var repositoryFactory = require("../repository/RepositoryFactory");

/**
 * This method returns (in the response) all roles
 */
module.exports.all = function(req, res){
	
	var roleRepository = repositoryFactory.getRoleRepository(req.app);

	var success = function(roles){
		res.json(roles);
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

	roleRepository.all(options, success, error);

}

/*
 * Creates a new role
 */

module.exports.create = function(req, res){
	
	var roleRepository = repositoryFactory.getRoleRepository(req.app);

	var success = function(role){
		res.json(role);
	}

	var error = function(error){
		logger.error(error);
		res.status(500).json(error);
	}

	var roleEntry = roleRepository.build(req.body);
	
	roleEntry.save().success(success).error(error);

}