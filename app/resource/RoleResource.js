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
module.exports.build = function(role, additional){

	var result = {
		id: role.id,
		name: role.name
	}

	return result;
}

module.exports.buildList = function(roleModels){
	if(roleModels.rows){
		if(Array.isArray(roleModels.rows)){
			var array = [];
			var rows = roleModels.rows;

			for(var i = 0; i < rows.length; i++) {
				var builtRole = module.exports.build(rows[i]);
				array.push(builtRole);
			}

			return {
				"roles": array,
				"pagination": {
					"offset": roleModels.offset,
					"page": Math.ceil(roleModels.offset/roleModels.limit),
					"limit": roleModels.limit,
					"count": roleModels.count
				}
			};
		}else{
			return module.exports.build(roleModels);
		}
	}else{
		return module.exports.build(roleModels);
	}

}
