/**
 * This module represents a repository for the table permissions
 * @param {Sequelize} permissionModel the model created by sequelize
 */

var permissionModelReference;

module.exports.init(permissionModel) {

    permissionModelReference = permissionModel;
    return this;
}

module.exports.getModel = function() {
    return permissionModelReference;
}

/**
 * Finds all results of the permissions table according to the params offset and limit
 */
module.exports.getAllPermissions = function(options, success, error) {
    permissionModelReference.findAndCountAll({offset: options.offset, limit: options.limit}).success(success).error(error);
}



/**
 * Get a permission given its name.
 */
module.exports.getPermissionByName = function(permissionName, success, error) {
    permissionModelReference.find({ where: { name: permissionName } }).success(success).error(error);
}

/**
 * Get a permission given its id.
 */
module.exports.getPermissionById = function(id, success, error) {
    permissionModelReference.find({ where: { id: id } }).success(success).error(error);
}

/**
 * Update a permission given its id.
 */
module.exports.updatePermission = function(id, updatedPermission, success, error) {
    // update(updated entity, where clause)
    permissionModelReference.update(updatedPermission, { id: id }).success(success).error(error);
}

/**
 * Delete a permission given its id.
 */
module.exports.deletePermission = function(id, success, error) {
    permissionModelReference.destroy({ id: id }).success(success).error(error);
}

/**
 * Gets the permissions of the given role.
 */
module.exports.findRolesWhereTheGivenPermissionIsRegistered = function(permissionName, success, error) {

    var getSuccess = function(permission) {

        if (permission) {
            permission.getRoles().success(success).error(error);
        } else {
            error("No hay un permiso con el nombre: " + permissionName);
        }
    };

    this.getPermissionByName(permissionName, getSuccess, error);
}
