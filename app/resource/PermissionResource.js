var logger = require("../../config/logger");

/**
 * This module works as a DTO from business to client.
 * It represents a permission rest resource
 */


/**
 * Build the permission resource by adding or deleting some properties.
 * This is better than exposing the model directly since we build
 * the response manually. We do not let sensitive data to be sent
 * (i.e password and salt)
 * @param userModel the JSON string representing a user model
 */
module.exports.build = function(permissionModel, additional){

	var result = {
		httpVerb: permissionModel.httpVerb,
		uri: permissionModel.uri
	}

	return result;
}

module.exports.buildList = function(permissionModels){
	if(Array.isArray(permissionModels)){
		var array = [];

		for(var i = 0; i < permissionModels.length; i++) {
			var builtPermission = module.exports.build(permissionModels[i]);
			logger.debug(builtPermission);
			array.push(builtPermission);
		}

		return array;
	}else{
		return module.exports.build(permissionModels);
	}

}
