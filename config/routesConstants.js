module.exports.getRoutes = function() {

    var routes = {

        // Public resources
        index: "/",
        login: "/login",
        userLogin: "/api/users/login",
        userLogout: "/api/users/logout",

        //sessions
        sessions: "/api/sessions",

        // Users
        users: "/api/users",
        specificUSer: "/api/users/:id",

        // Roles
        roles: "/api/roles",
        specificRole: "/api/roles/:rolename",

        //Token - Permissions relationship
        tokenPermissions: "/api/tokens/permissions",

        // Roles - Permissions relationship
        rolePermissions: "/api/roles/:rolename/permissions",

        // Permissions
        permissions: "/api/permissions",
        specificPermission: "/api/permissions/:permissionName"
    }

    return routes;
};

module.exports.getPublicRoutes = function() {

    var routes = this.getRoutes();

    var publicResources = [
        { httpVerb: 'post', uri: routes.sessions },
        { httpVerb: 'get', uri: routes.sessions },
        { httpVerb: 'delete', uri: routes.sessions }
    ];

    return publicResources;
};
