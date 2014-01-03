var repositoryFactory = require("../repository/RepositoryFactory").getRepositoryFactory();

/**
 * This module represents a repository for the table role
 * @param {Sequelize} roleModel the model created by sequelize
 */
module.exports = function(roleModel) {

    roleModel.createRole = function(jsonRole, permissionsIdList, success, error) {
        
        var repositoryFactory = require("./RepositoryFactory").getRepositoryFactory();
        var permissionRepository = repositoryFactory.getPermissionRepository();

        var permissionRepository = repositoryFactory.getPermissionRepository();

        roleModel.create(jsonRole).success(function(createdRole) {

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
    roleModel.getAllRoles = function(options, success, error) {
        roleModel.findAndCountAll({offset: options.offset, limit: options.limit}).success(success).error(error);
    }

    /**
     * Get role by name
     */
    roleModel.getRoleByName = function(roleName, success, error) {

        roleModel.find({ where: { name: roleName } }).success(success).error(error);
    }

    /**
     * Get role by name
     */
    roleModel.getRoleById = function(id, success, error) {

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

        roleModel.find({ where: { id: id } }).success(successFind).error(error);
    }

    roleModel.updateRole = function(updatedRole, success, error) {

        var repositoryFactory = require("./RepositoryFactory").getRepositoryFactory();
        var permissionRepository = repositoryFactory.getPermissionRepository();

        roleModel.update(updatedRole, { id: updatedRole.id }).success(function(role) {

            var permissionsArray = [];

            for(var i = 0; i < permissionsIdList.length; i++) {

                var built = permissionRepository.build({ id: permissionsIdList[i] });
                permissionsArray.push(built);
            }

            role.setPermissions(permissionsArray).success(function() {

                role.permissions = permissionsArray;
                success(role);

            }).error(error);
        });
    }

    roleModel.deleteRole = function(id, success, error) {

        // Remove the permissions associated with the role.

        var getSuccess = function(role) {

            role.setPermissions([]).success(function(successResult) {

                roleModel.destroy({ id: id }).success(success).error(error);
            });
        };

        this.getRoleById(id, getSuccess, error);
    }

    roleModel.getRolePermissionsById = function(id, success, error) {

        var getRoleSuccess = function(role) {

            if (role) {
                role.getPermissions().success(success).error(error);
            } else {
                error("No hay un rol con ID: " + id);
            }
        };

        roleModel.getRoleById(id, getRoleSuccess, error);
    }

    roleModel.getRolePermissions = function(roleName, success, error) {

        var getRoleSuccess = function(role) {

            if (role) {
                role.getPermissions().success(success).error(error);
            } else {
                error("No hay un rol con nombre: " + roleName);
            }
        };

        roleModel.getRoleByName(roleName, getRoleSuccess, error);
    }

    roleModel.addPermissionToRole = function(roleName, jsonPermission, success, error) {

        var getSuccess = function(role) {

            var repositoryFactory = require("./RepositoryFactory").getRepositoryFactory();
            var permissionRepository = repositoryFactory.getPermissionRepository();

            permissionRepository.create(jsonPermission).success(function(permission) {
                role.addPermission(permission).success(success).error(error);
            });
        };

        roleModel.getRoleByName(roleName, getSuccess, error);
    }

    roleModel.setMultiplePermissionsToRole = function(roleId, permissionsArray, success, error) {

        var getSuccess = function(role) {

            var repositoryFactory = require("./RepositoryFactory").getRepositoryFactory();
            var permissionRepository = repositoryFactory.getPermissionRepository();

            permissionRepository.bulkCreate(permissionsArray).success(function(permissions) {
                role.setPermissions(permissions).success(success).error(error);
            });
        };

        roleModel.getRoleByName(roleName, getSuccess, error);
    }

    return roleModel;
};
