/**
 * This module represents all routes related to roles
 */
var logger = require("../../config/logger");
var routesConstants = require("../../config/routesConstants");
var permissionBusiness = require("../business/PermissionBusiness");

/**
 * Following are the routes for permissions.
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {

    var routes = routesConstants.getRoutes();

    // Get all permissions.
    app.get(routes.permissions, permissionBusiness.getAllPermissions);

    // Create a permission.
    app.post(routes.permissions, permissionBusiness.createPermission);

    // Get a specific permission.
    app.get(routes.specificPermission, permissionBusiness.getPermission);

    // Update a specific permission.
    app.put(routes.specificPermission, permissionBusiness.updatePermission);

    // delete a specific permission.
    app.delete(routes.specificPermission, permissionBusiness.deletePermission);
};
