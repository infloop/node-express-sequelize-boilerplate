var logger = require("../../config/logger");

/**
 * This module works as a DTO from business to client.
 * It represents a permission rest resource
 */


/**
 * Build the permission resource by adding or deleting some properties.
 * This is better than exposing the model directly since we build
 * the response manually.
 * @param permissionModel the JSON string representing a permission model
 */
module.exports.build = function(permissionModel, additional){

	var result = {
		id: permissionModel.id,
		name: permissionModel.name,
		httpVerb: permissionModel.httpVerb,
		uri: permissionModel.uri
	}

	return result;
}

module.exports.buildList = function(permissionModels) {

	if(permissionModels.rows) {

		if(Array.isArray(permissionModels.rows)) {

			var array = [];
			var rows = permissionModels.rows;

			for(var i = 0; i < rows.length; i++) {
				var builtPermission = module.exports.build(rows[i]);
				array.push(builtPermission);
			}

			return {
				"permissions": array,
				"pagination": {
					"offset": permissionModels.offset,
					"page": Math.ceil(permissionModels.offset/permissionModels.limit),
					"limit": permissionModels.limit,
					"count": permissionModels.count
				}
			};

		} else {

			return module.exports.build(permissionModels);
		}
	} else {

		return module.exports.build(permissionModels);
	}
}
