/**
 * This module represents all routes related to roles
 */
var logger = require("../../config/logger");
var routesConstants = require("../../config/routesConstants");
var tokenBusiness = require("../business/TokenBusiness");

/**
 * Following are the routes for roles
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {

    var routes = routesConstants.getRoutes();

    // Get permissions by tokeb
    app.get(routes.tokenPermissions, tokenBusiness.getPermissionsByToken);
};
