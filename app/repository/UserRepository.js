/**
 * This module represents a repository for the table user
 * @param {Sequelize} userModel the model created by sequelize
 */
module.exports = function(userModel) {

	/**
	 * finds all results of the user table according to the params offset and limit
	 */
	userModel.getAllUsers = function(options, success, error){
		var opts = {};

		if(options.offset){
			opts.offset = options.offset;
		}

		if(options.limit){
			opts.limit = options.limit;
		}

		var where = {};

		if(options.username){
			where.username = options.username;
		}

		if(options.email){
			where.email = options.email;
		}

		opts.where = where;

		userModel.findAndCountAll(opts).success(success).error(error);
	}

    userModel.findByUsername = function(username, success, error){
		userModel.find({where: {username: username}}).success(success).error(error);
	}

	userModel.findById = function(id, success, error){
		userModel.find({where: {id: id}}).success(success).error(error);
	}

    userModel.updateById = function(id, updatedUser, success, error) {
    	
    	//encrypt password if requested
    	if(updatedUser.password){	
	    	var instance = userModel.build();
	    	var encryptedPassword = instance.encryptPassword(updatedUser.password);
	    	updatedUser.password = encryptedPassword;
    	}

    	// update(updated entity, where clause)
        userModel.update(updatedUser, {id: id}).success(success).error(error);
	}

    userModel.deleteById = function(id, success, error) {
        userModel.destroy({id: id}).success(success).error(error);
    }

	return userModel;
};
