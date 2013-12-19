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
    permissionModel.getPermissionByName = function(permissionName, updatedPermission, success, error) {
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
        // update(updated entity, where clause)
        permissionModel.delete({ name: permissionName }).success(success).error(error);
    }

    /**
     * Gets the permissions of the given role.
     */
    permissionModel.findPermissionsByRole = function(role, success, error) {
        permissionModel.findAll({ where: { roleId: role.id } }).success(success).error(error);
    }

	return permissionModel;
};
