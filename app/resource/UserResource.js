var logger = require("../../config/logger");

/**
 * This module works as a DTO from business to client.
 * It represents a user rest resource
 */


/**
 * Build the user resource by adding or deleting some properties.
 * This is better than exposing the model directly since we build
 * the response manually. We do not let sensitive data to be sent
 * (i.e password and salt)
 * @param userModel the JSON string representing a user model
 */
module.exports.build = function(userModel, additional){

	var result = {
		id: userModel.id,
		username: userModel.username,
		email: userModel.email,
		createdAt: userModel.createdAt,
		roleId: userModel.roleId
	}

	return result;
}

module.exports.buildList = function(userModel){

	var array = [];

	var rows = userModel.rows;

	for(var i = 0; i < rows.length; i++) {

		var builtUser = module.exports.build(rows[i]);
		array.push(builtUser);
	}

	return {
		"users": array,
		"pagination": {
			"offset": userModel.offset,
			"page": Math.ceil(userModel.offset/userModel.limit),
			"limit": userModel.limit,
			"count": userModel.count
		}
	};

}
