/**
 * This module represents all routes related to roles
 */
var logger = require("../../config/logger");
var routesConstants = require("../../config/routesConstants");
var roleBusiness = require("../business/RoleBusiness");

/**
 * Following are the routes for roles
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {

    var routes = routesConstants.getRoutes();

    // Get all roles.
    app.get(routes.roles, roleBusiness.all);
    
    // Create a new role.
    app.put(routes.roles, roleBusiness.create);

    // Get all role permissions
    app.get(routes.permissions, roleBusiness.getRolePermissions);

    // add a new permission to a role.
    app.post(routes.permissions, roleBusiness.addPermissionToRole);
};
