/**
 * This module represents a repository for the table userToken
 * @param {Sequelize} userTokenModel the model created by sequelize
 */
var logger = require("../../config/logger");
var randomString = require('randomstring');

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];

module.exports = function(sequelizeModel) {

    /**
     * Finds a role row by token
     */
    sequelizeModel.findRoleByToken = function(success, error) {
        
        sequelizeModel.query("SELECT r.id, r.name FROM userTokens ut, users u, roles r WHERE 
                             ut.userId = u.id AND u.roleId = r.id GROUP BY r.id").success(success).error(error);
    }

    return sequelizeModel;
}
