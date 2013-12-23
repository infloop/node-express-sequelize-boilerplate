var logger = require("../../config/logger");
var constants = require("../../config/constants");
var repositoryFactory = require("../repository/RepositoryFactory");
var authorization = require("../auth/Authorization");
// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];

var permissionResource = require("../resource/PermissionResource");

module.exports.getPermissionsByToken = function(req, res){

    var token = authorization.getTokenFromRequest(req);

    var success = function(permissions){
        logger.debug(permissions);
        res.json(permissionResource.buildList(permissions));
    }

    var error = function(error){
        res.status(500).json(error);
    }

    var sequelizeRepository = repositoryFactory.getSequelizeRepository(req.app);
    sequelizeRepository.findPermissionsByToken(token, success, error);   
}