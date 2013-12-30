var logger = require("../../config/logger");

var appReference = null;

module.exports.init = function(app) {

    appReference = app;
};

module.exports.getRepositoryFactory = function() {

    var repositoryFactory = {

        getSequelizeRepository: function() {
            return require("../repository/SequelizeRepository")(appReference.get("models").sequelize);
        },

        getUserRepository: function() {
            return require("../repository/UserRepository")(appReference.get("models").User);
        },

        getRoleRepository: function() {
            return require("../repository/RoleRepository")(appReference.get("models").Role);
        },

        getPermissionRepository: function() {
            return require("../repository/PermissionRepository")(appReference.get("models").Permission);
        },

        getUserTokenRepository: function() {
            return require("../repository/UserTokenRepository")(appReference.get("models").UserToken);
        }
    };

    return repositoryFactory;
};
