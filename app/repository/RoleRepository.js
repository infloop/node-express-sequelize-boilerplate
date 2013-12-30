/**
 * This module represents a repository for the table role
 * @param {Sequelize} roleModel the model created by sequelize
 */
module.exports = function(roleModel) {

    /**
     * finds all results of the roles table according to the params offset and limit
     */
    roleModel.getAllRoles = function(options, success, error) {
        roleModel.findAll({offset: options.offset, limit: options.limit}).success(success).error(error);
    }

    /**
     * Get role by name
     */
    roleModel.getRoleByName = function(roleName, success, error) {

        roleModel.find({ where: { name: roleName } }).success(success).error(error);
    }

    roleModel.updateRoleByName = function(roleName, updatedRole, success, error) {

        roleModel.update(updatedRole, { name: roleName }).success(success).error(error);
    }

    roleModel.deleteRoleByName = function(roleName, success, error) {

        roleModel.destroy({ name: roleName }).success(success).error(error);
    }

    roleModel.getRolePermissions = function(roleName, success, error) {

        var getRoleSuccess = function(role) {

            if (role) {
                role.getPermissions().success(success).error(error);
            } else {
                error("No hay un rol con nombre: " + roleName);
            }
        };

        roleModel.getRoleByName(roleName, getRoleSuccess, error)
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

    roleModel.setMultiplePermissionsToRole = function(roleName, permissionsArray, success, error) {

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
