/**
 * This module represents a repository for the table permissions
 * @param {Sequelize} permissionModel the model created by sequelize
 */
module.exports = function(permissionModel) {

	/**
	 * Finds all results of the permissions table according to the params offset and limit
	 */
	permissionModel.getAllPermissions = function(options, success, error) {
		permissionModel.findAll({offset: options.offset, limit: options.limit}).success(success).error(error);
	}

    /**
     * Update a permission given its name.
     */
    permissionModel.getPermissionByName = function(permissionName, success, error) {
        // update(updated entity, where clause)
        permissionModel.find({ where: { name: permissionName } }).success(success).error(error);
    }

    /**
     * Update a permission given its name.
     */
    permissionModel.updatePermissionByName = function(permissionName, updatedPermission, success, error) {
        // update(updated entity, where clause)
        permissionModel.update(updatedPermission, { name: permissionName }).success(success).error(error);
    }

    /**
     * Delete a permission given its name.
     */
    permissionModel.deletePermissionByName = function(permissionName, success, error) {
        permissionModel.destroy({ name: permissionName }).success(success).error(error);
    }

    /**
     * Gets the permissions of the given role.
     */
    permissionModel.findRolesWhereTheGivenPermissionIsRegistered = function(permissionName, success, error) {

        var getSuccess = function(permission) {

            if (permission) {
                permission.getRoles().success(success).error(error);
            } else {
                error("No hay un permiso con el nombre: " + permissionName);
            }
        };

        permissionModel.getPermissionByName(permissionName, getSuccess, error);
    }

	return permissionModel;
};
