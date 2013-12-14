module.exports.getRoutes = function() {

    var routes = {

        // Public resources
        index: "/",
        login: "/login",
        userLogin: "/api/users/login",
        userLogout: "/api/users/logout",

        // Users
        users: "/api/users",

        // Roles
        roles: "/api/roles",

        // Permissions
        permissions: "/api/roles/:role/permissions"
    }

    return routes;
};

module.exports.getPublicRoutes = function() {

    var routes = this.getRoutes();

    var publicResources = [
        { httpVerb: 'get', uri: routes.index },
        { httpVerb: 'get', uri: routes.login },
        { httpVerb: 'post', uri: routes.userLogin },
        { httpVerb: 'get', uri: routes.userLogout }
    ];

    return publicResources;
};
