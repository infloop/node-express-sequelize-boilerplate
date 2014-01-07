var repositoryFactory = require("../repository/RepositoryFactory").getRepositoryFactory();
var logger = require("../../config/logger");

/**
 * This module represents a repository for the table role
 * @param {Sequelize} roleModelReference the model created by sequelize
 */
var roleModelReference;

module.exports.init = function(roleModel) {

    roleModelReference = roleModel;
    return this;
}

module.exports.getModel = function() {
    return roleModelReference;
}

module.exports.createRole = function(jsonRole, permissionsIdList, success, error) {

    var permissionRepository = repositoryFactory.getPermissionRepository();

    roleModelReference.create(jsonRole).success(function(createdRole) {

        var permissionsArray = [];

        for(var i = 0; i < permissionsIdList.length; i++) {

            var built = permissionRepository.build({ id: permissionsIdList[i] });
            permissionsArray.push(built);
        }

        createdRole.setPermissions(permissionsArray).success(function() {

            createdRole.permissions = permissionsArray;
            success(createdRole);

        }).error(error);
    });
};

/**
 * finds all results of the roles table according to the params offset and limit
 */
module.exports.getAllRoles = function(options, success, error) {
    roleModelReference.findAndCountAll({offset: options.offset, limit: options.limit}).success(success).error(error);
}

/**
 * Get role by name
 */
module.exports.getRoleByName = function(roleName, success, error) {
    roleModelReference.find({ where: { name: roleName } }).success(success).error(error);
}

/**
 * Get role by name
 */
module.exports.getRoleById = function(id, success, error) {

    var successFind = function(role){
        if(role){
            var successPermissions = function(permissions){
                if(permissions){
                    role.permissions = permissions;
                }
                success(role);
            }

            role.getPermissions().success(successPermissions).error(error);    
        }else{
            success(false);
        }

    }

    roleModelReference.find({ where: { id: id } }).success(successFind).error(error);
}

module.exports.updateRole = function(updatedRole, permissionsIdList, success, error) {

    var permissionRepository = repositoryFactory.getPermissionRepository();

    roleModelReference.update(updatedRole, { id: updatedRole.id }).success(function() {

        var permissionsArray = [];

        for(var i = 0; i < permissionsIdList.length; i++) {

            var built = permissionRepository.build({ id: permissionsIdList[i] });
            permissionsArray.push(built);
        }

        var builtRole = roleModelReference.build(updatedRole);
        logger.info(builtRole.name);

        builtRole.setPermissions([]).success(function() {

            builtRole.setPermissions(permissionsArray).success(function() {

                builtRole.permissions = permissionsArray;
                success(builtRole);

            }).error(error);
        }).error(error);
    });
}

module.exports.deleteRole = function(id, success, error) {

    // Remove the permissions associated with the role.

    var getSuccess = function(role) {

        if (role) {

            role.setPermissions([]).success(function() {
                roleModelReference.destroy({ id: id }).success(success).error(error);
            });

        } else {
            error("No hay un rol con ID: " + id);
        }
    };

    this.getRoleById(id, getSuccess, error);
}

module.exports.getRolePermissionsById = function(id, success, error) {

    var getRoleSuccess = function(role) {

        if (role) {
            role.getPermissions().success(success).error(error);
        } else {
            error("No hay un rol con ID: " + id);
        }
    };

    this.getRoleById(id, getRoleSuccess, error);
}

module.exports.getRolePermissions = function(roleName, success, error) {

    var getRoleSuccess = function(role) {

        if (role) {
            role.getPermissions().success(success).error(error);
        } else {
            error("No hay un rol con nombre: " + roleName);
        }
    };

    this.getRoleByName(roleName, getRoleSuccess, error);
}

module.exports.addPermissionToRole = function(roleName, jsonPermission, success, error) {

    var getSuccess = function(role) {

        var permissionRepository = repositoryFactory.getPermissionRepository();

        permissionRepository.create(jsonPermission).success(function(permission) {
            role.addPermission(permission).success(success).error(error);
        });
    };

    roleModelReference.getRoleByName(roleName, getSuccess, error);
}

module.exports.setMultiplePermissionsToRole = function(roleId, permissionsArray, success, error) {

    var getSuccess = function(role) {

        var permissionRepository = repositoryFactory.getPermissionRepository();

        permissionRepository.bulkCreate(permissionsArray).success(function(permissions) {
            role.setPermissions(permissions).success(success).error(error);
        });
    };

    roleModelReference.getRoleByName(roleName, getSuccess, error);
}
