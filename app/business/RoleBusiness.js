var logger = require("../../config/logger");
var constants = require("../../config/constants");
var repositoryFactory = require("../repository/RepositoryFactory").getRepositoryFactory();

var roleResource = require("../resource/RoleResource");

/**
 * This method returns (in the response) all roles
 */
module.exports.all = function(req, res) {

    var roleRepository = repositoryFactory.getRoleRepository();

    var offset = (req.param('offset') > 0 ? req.param('offset') : 1) - 1;
    var limit = (req.param('limit') > 0 ? req.param('limit') : constants.limit);

    var success = function(roles){
        if(roles){
            roles.offset = offset;
            roles.limit = limit;
            res.status(200).json(roleResource.buildList(roles));    
            return;
        }

        res.status(404).json("Not found");
        
    }

    var error = function(err){
        res.status(500).json(err);
    }

    var options = {

        offset: offset,
        limit: limit
    }

    roleRepository.getAllRoles(options, success, error);
}

module.exports.getRole = function(req, res) {

    var success = function(role) {
        if(role){
            res.status(200).json(roleResource.buildList(role));    
            return;
        }
        res.status(404).json("Not found");
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var roleRepository = repositoryFactory.getRoleRepository();
    roleRepository.getRoleById(req.params.id, success, error);
}

/*
 * Creates a new role
 */
module.exports.create = function(req, res) {

    var roleRepository = repositoryFactory.getRoleRepository();
    
    // permissions id list.
    var permissionsList = req.body.permissions;

    // Role 
    var jsonRole = req.body;
    //delete permissions
    delete jsonRole.permissions;

    var success = function(createRole) {
        res.status(201).json(roleResource.build(createRole));
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    roleRepository.createRole(jsonRole, permissionsList, success, error);
}

module.exports.updateRole = function(req, res) {

    var roleRepository = repositoryFactory.getRoleRepository();
    
    // permissions id list.
    var permissionsList = req.body.permissions;

    // Role 
    var jsonRole = req.body;
    //delete permissions
    delete jsonRole.permissions;

    var success = function(createRole) {
        res.status(200).json(roleResource.build(createRole));
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    //set id
    jsonRole.id = req.params.id;

    roleRepository.updateRole(jsonRole, permissionsList, success, error);
}

module.exports.deleteRole = function(req, res) {

    var success = function() {
        res.status(200).json("OK");
    };

    var error = function(error) {
        res.status(500).json(error);
    };

    var roleRepository = repositoryFactory.getRoleRepository();
    roleRepository.deleteRole(req.params.id, success, error);
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
    roleRepository.setMultiplePermissionsToRole(req.params.id, req.body, success, error);
};
