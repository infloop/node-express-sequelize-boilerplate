var logger = require("../../config/logger");
var constants = require("../../config/constants");
var repositoryFactory = require("../repository/RepositoryFactory").getRepositoryFactory();

var permissionResource = require("../resource/PermissionResource");

/**
 * This method returns (in the response) all roles
 */
module.exports.getAllPermissions = function(req, res) {

    var offset = (req.param('offset') > 0 ? req.param('offset') : 1) - 1;
    var limit = (req.param('limit') > 0 ? req.param('limit') : constants.limit);

    var options = {

        offset: offset,
        limit: limit
    };

    var success = function(permissions) {
        permissions.offset = offset;
        permissions.limit = limit;
        res.status(200).json(permissionResource.buildList(permissions));
    };

    var error = function(err){
        res.status(500).json(err);
    };

    // var offset = (req.param('offset') > 0 ? req.param('offset') : 1) - 1;
    // var limit = (req.param('limit') > 0 ? req.param('limit') : constants.limit);

    var permissionRepository = repositoryFactory.getPermissionRepository();
    permissionRepository.getAllPermissions(options, success, error);
}

/*
 * Creates a new permission
 */
module.exports.createPermission = function(req, res) {

    var permissionRepository = repositoryFactory.getPermissionRepository();

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

module.exports.getPermission = function(req, res) {

    var success = function(permission) {
        if(permission){
            res.status(200).json(permissionResource.buildList(permission));    
            return;
        }
        res.status(404).json("Not found");
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var permissionRepository = repositoryFactory.getPermissionRepository();
    permissionRepository.getPermissionById(req.params.id, success, error);
}

module.exports.updatePermission = function(req, res) {

    var success = function() {
        res.status(200).json("OK");
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var permissionRepository = repositoryFactory.getPermissionRepository();
    permissionRepository.updatePermission(req.params.id, req.body, success, error);
}

module.exports.deletePermission = function(req, res) {

    var success = function() {
        res.status(200).json("OK");
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var permissionRepository = repositoryFactory.getPermissionRepository();
    permissionRepository.deletePermission(req.params.id, success, error);
}
