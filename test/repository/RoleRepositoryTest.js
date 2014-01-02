var logger = require("../../config/logger");
var should = require('should');

var roleRepository;
var permissionRepository;

var sequelize;

describe('RoleRepository', function () {

    var error = function(err) {
        throw err;
    };

    var createRoles = function(total, cb) {

        var arrayObjs = [];

        for(var i = 0; i < total ; i++) {
            arrayObjs.push({ name: "prueba" + i });
        }

        var success = function() {
            cb();
        };

        roleRepository.bulkCreate(arrayObjs).success(success).error(error);
    };

    var createPermissions = function(numberOfPermissions, callback) {

        var permissionsArray = [];

        for (var i = 0; i < numberOfPermissions; i++) {

            var permission = {

                name: 'create' + i,
                httpVerb: 'verb' + i,
                uri: '/api/resource-x/' + i
            };
            
            permissionsArray.push(permission);
        }

        var success = function(createdPermissions) {
            callback(createdPermissions);
        };

        permissionRepository.create(permissionsArray).success(success).error(error);
    };

    var createRolesAndPermissions = function(numberOfPermissionsPerRole, callback) {

        var role = {

            name: 'admin'
        };

        roleRepository.create(role).success(function(createdRole) {

            var permissionsSuccess = function(createdPermissions) {

                var success = function(result) {
                    callback(result);
                };

                createdRole.setPermissions(createdPermissions).success(success).error(error);
            };

            createPermissions(numberOfPermissionsPerRole, permissionsSuccess);
        });
    };

    describe('all method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            roleRepository = require("../../app/repository/RoleRepository")(sequelize.Role);

            //create table
            roleRepository.sync({force: true}).success(function() {

                done();	

            }).error(error);

        });

        it('should return all roles OK', function (done) {

            var totalRegisters = 2;

            //this is the callback function that gets exectuted after creating example data in db
            var find = function() {

                var success = function(result) {

                    result.length.should.equal(totalRegisters);

                    result[0].dataValues.id.should.equal(1);
                    result[1].dataValues.id.should.equal(2);

                    //here the test ends
                    done();
                }

                var error = function(err) {
                    throw err;
                }

                var offset = 0;
                var limit = 10;

                var options = {
                    offset: offset,
                    limit: limit
                }

                roleRepository.getAllRoles(options, success, error);
            };

            //first create some example roles
            createRoles(totalRegisters, find);
        });

    });

    describe('getRoleByName method', function () {

        before(function(done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            roleRepository = require("../../app/repository/RoleRepository")(sequelize.Role);

            //create table
            roleRepository.sync({force: true}).success(function(){

                done();	

            }).error(error);
        });

        it('should find a role', function (done) {

            var totalRegisters = 2;

            var rolename = "prueba1";

            //this is the callback function that gets exectuted after creating example data in db
            var findByRolename = function() {

                var success = function(result) {

                    result.name.should.equal(rolename);

                    //here the test ends
                    done();
                }

                var error = function(err) {
                    throw err;
                }


                roleRepository.getRoleByName(rolename, success, error);
            };

            //first create some example roles
            createRoles(totalRegisters, findByRolename);
        });
    });

    describe('updateRoleByName method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            roleRepository = require("../../app/repository/RoleRepository")(sequelize.Role);

            //create table
            roleRepository.sync({force: true}).success(function(){

                done();	

            }).error(error);
        });

        it('should update a role', function (done) {

            var totalRegisters = 2;

            var rolename = "prueba1";

            var updatedRoleName = 'admin';
            var updatedRole = {

                'name' : updatedRoleName,
            }

            //this is the callback function that gets exectuted after creating example data in db
            var updateByRolename = function() {

                var success = function(success) {

                    var findSuccess = function(result) {
                        result.name.should.equal(updatedRoleName);
                        done();
                    };

                    var findError = function(error) {
                        throw error;
                    };

                    roleRepository.getRoleByName(updatedRoleName, findSuccess, findError);
                }

                var error = function(err) {
                    throw err;
                }

                roleRepository.updateRoleByName(rolename, updatedRole, success, error);
            };

            //first create some example roles
            createRoles(totalRegisters, updateByRolename);
        });
    });

    describe('deleteRoleByName method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            roleRepository = require("../../app/repository/RoleRepository")(sequelize.Role);

            //create table
            roleRepository.sync({force: true}).success(function(){

                done();	

            }).error(error);
        });

        it('should delete a role', function (done) {

            var totalRegisters = 2;

            var rolename = "prueba1";

            //this is the callback function that gets exectuted after creating example data in db
            var deleteRoleByRolename = function() {

                var success = function(success) {

                    roleRepository.count().success(function(result) {

                        result.should.equal(totalRegisters - 1);
                        done();
                    });
                }

                var error = function(err) {
                    throw err;
                }

                roleRepository.deleteRoleByName(rolename, success, error);
            };

            //first create some example roles
            createRoles(totalRegisters, deleteRoleByRolename);
        });
    });

    describe('getRolePermissions method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            roleRepository = require("../../app/repository/RoleRepository")(sequelize.Role);
            permissionRepository = require("../../app/repository/PermissionRepository")(sequelize.Permission);

            var error = function(error) {
                error(error);
            };

            // Create roles table
            roleRepository.sync({force: true}).success(function(){

            }).error(error);

            // Create permissions table
            permissionRepository.sync({force: true}).success(function(){

                done();

            }).error(error);
        });

        it('should return the permissions of the given role', function (done) {

            var error = function(error) {
                error(error);
            };

            var numberOfPermissions = 3;
            var roleName = 'admin';

            var findRolePermissions = function() {

                var findSuccess = function(permissionsArray) {

                    permissionsArray.length.should.equal(1);

                    var permissionOne = permissionsArray[0];
                    permissionOne.name.should.equal('prueba1');

                    done();
                };

                roleRepository.getRolePermissions(roleName, findSuccess, error);
            };

            createRolesAndPermissions(numberOfPermissions, findRolePermissions);
        });
    });

    describe('deleteRoleByName method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            roleRepository = require("../../app/repository/RoleRepository")(sequelize.Role);
            permissionRepository = require("../../app/repository/PermissionRepository")(sequelize.Permission);

            // Create roles table
            roleRepository.sync({force: true}).success(function(){

            }).error(function(error) {
                throw error;
            });

            // Create permissions table
            permissionRepository.sync({force: true}).success(function(){

                // done();

            }).error(error);
        });

        it('should delete the role matching the given name and its relations in the permissionsroles table.', function (done) {

            var error = function(error) {
                error(error);
            };

            var roleName = 'admin';

            var deleteRoleCallback = function() {

                var deleteSuccess = function(result) {

                    /*

                       permissionsArray.length.should.equal(1);

                       var permissionOne = permissionsArray[0];
                       permissionOne.name.should.equal('prueba1');
                       */

                    logger.warn("************* 1");
                    logger.warn(result);

                    done();
                };

                roleRepository.deleteRoleByName(roleName, deleteSuccess, error);
            };

            createRolesAndPermissions(deleteRoleCallback);
        });
    });
});
