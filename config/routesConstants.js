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

        // Roles
        roles: "/api/roles",

        //Token - Permissions relationship
        tokenPermissions: "/api/tokens/permissions",

        // Roles - Permissions relationship
        rolePermissions: "/api/roles/:role/permissions"
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
