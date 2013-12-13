var logger = require("../../config/logger");
var constants = require("../../config/constants");
var repositoryFactory = require("../repository/RepositoryFactory");

/**
 * This method returns (in the response) all roles
 */
module.exports.all = function(req, res) {

    var roleRepository = repositoryFactory.getRoleRepository(req.app);

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

module.exports.getRolePermissions = function(req, res) {

    var roleSuccess = function(role) {

        logger.debug(role);

        var success = function(permissionList) {

            if (permissionList) {

                res.status(200).json(permissionList);

            } else {

                // returns an empty list.
                var emptyList = new Array();
                res.status(200).json(emptyList);
            }
        };

        var error = function(error) {

            res.status(500).json(error);
        };

        var permissionRepository = repositoryFactory.getPermissionRepository(req.app);
        permissionRepository.findPermissionsByRole(role, success, error);
    }

    var roleError = function(error) {

        res.status(500).json(error);
    }

    var roleRepository = repositoryFactory.getRoleRepository(req.app);
    roleRepository.getRoleByName(req.params.role, roleSuccess, roleError);
}

module.exports.addPermissionToRole = function(req, res) {

    var roleSuccess = function(role) {

        if (role) {

        } else {

        }

        var saveSuccess = function(permission) {

            logger.debug("from saveSuccess");

            role.addPermission(permission).success(function() {

                logger.debug("*************** HERE 123");
                res.status(200).json("");
            });
        };

        var saveError = function(error) {

            res.status(500).json(error);
        };

        // Saves the permission to the role.
        var permissionRepository = repositoryFactory.getPermissionRepository(req.app);
        var permissionEntry =  permissionRepository.build(req.body);
        permissionEntry.save().success(saveSuccess).error(saveError);        
    }

    var roleError = function(error) {

        res.status(500).json(error);
    }

    var roleRepository = repositoryFactory.getRoleRepository(req.app);
    roleRepository.getRoleByName(req.params.role, roleSuccess, roleError);
}
