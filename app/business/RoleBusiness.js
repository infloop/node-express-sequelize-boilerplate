var logger = require("../../config/logger");
var constants = require("../../config/constants");
var repositoryFactory = require("../repository/RepositoryFactory").getRepositoryFactory();

/**
 * This method returns (in the response) all roles
 */
module.exports.all = function(req, res) {

    var roleRepository = repositoryFactory.getRoleRepository();

    var success = function(roles){
        res.status(200).json(roles);
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

    roleRepository.getAllRoles(options, success, error);
}

/*
 * Creates a new role
 */
module.exports.create = function(req, res) {

    var roleRepository = repositoryFactory.getRoleRepository();

    var success = function(role) {

        if (role) {

            res.status(201).json(role);
        }
    }

    var error = function(error) {

        res.status(500).json(error);
    }

    var roleEntry = roleRepository.build(req.body);
    roleEntry.save().success(success).error(error);
}

module.exports.updateRoleByName = function(req, res) {

    var success = function(success) {
        res.status(200).json(success);
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var roleRepository = repositoryFactory.getRoleRepository();
    roleRepository.updateRoleByName(req.params.rolename, req.body, success, error);
}

module.exports.deleteRoleByName = function(req, res) {

    var success = function(success) {
        res.status(200).json(success);
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var roleRepository = repositoryFactory.getRoleRepository();
    roleRepository.deleteRoleByName(req.params.rolename, success, error);
};

module.exports.getRolePermissions = function(req, res) {

    var success = function(success) {
        res.status(200).json(success);
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var roleRepository = repositoryFactory.getRoleRepository();
    roleRepository.getRolePermissions(req.params.role, success, error);
};

module.exports.addPermissionToRole = function(req, res) {

    var success = function(success) {
        res.status(201).json(success);
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var roleRepository = repositoryFactory.getRoleRepository();
    roleRepository.addPermissionToRole(req.params.role, req.body, success, error);
};

module.exports.setMultiplePermissionsToRole = function(req, res) {

    var success = function(success) {
        res.status(201).json(success);
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var roleRepository = repositoryFactory.getRoleRepository();
    roleRepository.setMultiplePermissionsToRole(req.params.role, req.body, success, error);
};
