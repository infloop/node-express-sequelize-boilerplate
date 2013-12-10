/**
 * This module represents a repository for the table role
 * @param {Sequelize} roleModel the model created by sequelize
 */
module.exports = function(roleModel){

	/**
	 * finds all results of the roles table according to the params offset and limit
	 */
	roleModel.all = function(options, success, error){
		roleModel.findAll({offset: options.offset, limit: options.limit}).success(success).error(error);
	}

	return roleModel;
};
