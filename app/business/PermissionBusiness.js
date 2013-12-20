var logger = require("../../config/logger");
var constants = require("../../config/constants");
var repositoryFactory = require("../repository/RepositoryFactory");

/**
 * This method returns (in the response) all roles
 */
module.exports.getAllPermissions = function(req, res) {

    var permissionRepository = repositoryFactory.getPermissionRepository(req.app);

    var success = function(permissions) {
        res.status(200).json(permissions);
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

    permissionRepository.getAllPermissions(options, success, error);
}

/*
 * Creates a new permission
 */
module.exports.createPermission = function(req, res) {

    var permissionRepository = repositoryFactory.getPermissionRepository(req.app);

    var success = function(permission) {

        if (permission) {

            res.status(201).json(permission);
        }
    }

    var error = function(error) {

        res.status(500).json(error);
    }

    var permissionEntry = permissionRepository.build(req.body);
    permissionEntry.save().success(success).error(error);
}

module.exports.getPermissionByName = function(req, res) {

    var success = function(success) {
        res.status(200).json(success);
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var permissionRepository = repositoryFactory.getPermissionRepository(req.app);
    permissionRepository.getPermissionByName(req.params.permissionName, success, error);
}

module.exports.updatePermissionByName = function(req, res) {

    var success = function(success) {
        res.status(200).json(success);
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var permissionRepository = repositoryFactory.getPermissionRepository(req.app);
    permissionRepository.updatePermissionByName(req.params.permissionName, req.body, success, error);
}

module.exports.deletePermissionByName = function(req, res) {

    var success = function(success) {
        res.status(200).json(success);
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var permissionRepository = repositoryFactory.getPermissionRepository(req.app);
    permissionRepository.deletePermissionByName(req.params.permissionName, success, error);
}
