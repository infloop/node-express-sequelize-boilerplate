/**
 * This module represents a repository for the table permissions
 * @param {Sequelize} permissionModel the model created by sequelize
 */
module.exports = function(permissionModel){

	/**
	 * finds all results of the permissions table according to the params offset and limit
	 */
	permissionModel.all = function(options, success, error){
		roleModel.findAll({offset: options.offset, limit: options.limit}).success(success).error(error);
	}


	return permissionModel;
};