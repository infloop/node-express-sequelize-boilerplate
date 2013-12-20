/**
 * This module represents a repository for the table user
 * @param {Sequelize} userModel the model created by sequelize
 */
module.exports = function(userModel) {

	/**
	 * finds all results of the user table according to the params offset and limit
	 */
	userModel.getAllUsers = function(options, success, error){
		userModel.findAll({offset: options.offset, limit: options.limit}).success(success).error(error);
	}

	userModel.findById = function(id, success, error){
		userModel.find({where: {id: id}}).success(success).error(error);
	}

    userModel.updateById = function(id, updatedUser, success, error) {
    	// update(updated entity, where clause)
        userModel.update(updatedUser, {id: id}).success(success).error(error);
	}

    userModel.deleteById = function(id, success, error) {
        userModel.destroy({id: id}).success(success).error(error);
    }

	return userModel;
};
