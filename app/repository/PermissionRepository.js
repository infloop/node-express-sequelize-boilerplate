/**
 * This module represents a repository for the table permissions
 * @param {Sequelize} permissionModel the model created by sequelize
 */
module.exports = function(permissionModel){

	/**
	 * finds all results of the permissions table according to the params offset and limit
	 */
	permissionModel.getAllPermissions = function(options, success, error){
		permissionModel.findAll({offset: options.offset, limit: options.limit}).success(success).error(error);
	}

    /**
     * Gets the permissions of the given role.
     */
    permissionModel.findPermissionsByRole = function(role, success, error) {

        permissionModel.findAll({ where: { roleId: role.id } }).success(success).error(error);
    }

	return permissionModel;
};
