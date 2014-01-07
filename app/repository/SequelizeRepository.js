/**
 * This module represents a repository for the raw queries.
 * @param {Sequelize} sequelizeModel the sequelize object.
 */
var logger = require("../../config/logger");
var randomString = require('randomstring');

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];

var sequelizeModelReference;

module.exports.init = function(sequelizeModel) {

    sequelizeModelReference = sequelizeModel;
    return this;
}

module.exports.getModel = function() {
    return sequelizeModelReference;
}

/*
 * Finds a role row by token
 */
module.exports.findRoleByToken = function(token, success, error) {

    var Role = require("../model/Role");

    // Raw query, see: http://sequelizejs.com/docs/latest/usage#raw-queries
    var rawQuery = 'SELECT r.id, r.name FROM userTokens ut, users u, roles r ' + 
        'WHERE ut.token = :queryToken AND ut.userId = u.id AND u.roleId = r.id GROUP BY r.id';
    sequelizeModelReference.query(rawQuery, null, { plain: true, raw: true }, { queryToken: token })
    .success(success).error(error);
}


module.exports.findPermissionsByToken = function(token, success, error){

    var rawQuery = 'SELECT p.name, p.httpVerb, p.uri FROM userTokens ut, users u, roles r, permissionsroles pr, ' 
    + 'permissions p WHERE ut.token = :queryToken AND ut.userId = u.id AND u.roleId = r.id AND r.id = pr.roleId AND ' 
    + 'pr.permissionId = p.id GROUP BY r.id';

    sequelizeModelReference.query(rawQuery, null, { plain: true, raw: true }, { queryToken: token })
    .success(success).error(error);
}
