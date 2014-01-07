var logger = require("../../config/logger");
var should = require('should');

var permissionRepository;
var roleRepository;

var sequelize;

describe('PermissionRepository', function () {

    var createPermissions = function(total, cb) {

        var arrayObjs = [];

        for(var i = 0; i < total ; i++) {

            arrayObjs.push({ 
                name: 'prueba' + i,
                httpVerb: 'get' + i,
                uri: '/api/users/' + i
            });
        }

        var success = function() {
            cb();
        };

        var error = function(err) {
            throw err;
        };

        permissionRepository.getModel().bulkCreate(arrayObjs).success(success).error(error);
    }

    describe('getAllPermissions method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            permissionRepository = require("../../app/repository/PermissionRepository").init(sequelize.Permission);

            //create table
            permissionRepository.getModel().sync({force: true}).success(function() {

                done();	

            }).error(function(error) {
                throw error;
            });


        });

        it('should return all permissions OK', function (done) {

            var totalRegisters = 5;

            //this is the callback function that gets exectuted after creating example data in db
            var find = function() {

                var success = function(result) {

                    (result.count).should.equal(totalRegisters);

                    result.rows[0].id.should.equal(1);
                    result.rows[1].id.should.equal(2);

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


                permissionRepository.getAllPermissions(options, success, error);
            };

            //first create some example roles
            createPermissions(totalRegisters, find);

        });

    });

    describe('getPermissionByName method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            permissionRepository = require("../../app/repository/PermissionRepository").init(sequelize.Permission);

            //create table
            permissionRepository.getModel().sync({force: true}).success(function(){

                done();	

            }).error(function(error) {
                throw error;
            });
        });

        it('should find a permission', function (done) {

            var totalRegisters = 3;

            var permissionName = "prueba1";

            //this is the callback function that gets exectuted after creating example data in db
            var findPermissionByName = function() {

                var success = function(result) {

                    result.name.should.equal(permissionName);
                    // then the test ends
                    done();
                }

                var error = function(err) {
                    throw err;
                }

                permissionRepository.getPermissionByName(permissionName, success, error);
            };

            //first create some example roles
            createPermissions(totalRegisters, findPermissionByName);
        });
    });

    describe('updatePermission method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            permissionRepository = require("../../app/repository/PermissionRepository").init(sequelize.Permission);

            //create table
            permissionRepository.getModel().sync({force: true}).success(function(){

                done();	

            }).error(function(error) {
                throw error;
            });
        });

        it('should update a permission', function (done) {

            var totalRegisters = 3;

            var rolename = "prueba1";

            var permissionId = 1;
            var updatedPermissionName = 'admin';
            var updatedPermission = {

                'name' : updatedPermissionName,
            }

            //this is the callback function that gets exectuted after creating example data in db
            var updateByPermissionName = function() {

                var success = function(success) {

                    var findSuccess = function(result) {

                        result.name.should.equal(updatedPermissionName);
                        done();
                    };

                    var findError = function(error) {
                        throw error;
                    };

                    permissionRepository.getPermissionByName(updatedPermissionName, findSuccess, findError);
                }

                var error = function(err) {
                    throw err;
                }

                permissionRepository.updatePermission(permissionId, updatedPermission, success, error);
            };

            //first create some example roles
            createPermissions(totalRegisters, updateByPermissionName);
        });
    });

    describe('deletePermission method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            permissionRepository = require("../../app/repository/PermissionRepository").init(sequelize.Permission);

            //create table
            permissionRepository.getModel().sync({force: true}).success(function(){

                done();	

            }).error(function(error) {
                throw error;
            });
        });

        it('should delete a role', function (done) {

            var totalRegisters = 2;

            var permissionId = "1";

            //this is the callback function that gets exectuted after creating example data in db
            var deletePermissionByPermissionName = function() {

                var success = function(success) {

                    permissionRepository.getModel().count().success(function(result) {

                        result.should.equal(totalRegisters - 1);
                        done();
                    });
                };

                var error = function(err) {
                    throw err;
                };

                permissionRepository.deletePermission(permissionId, success, error);
            };

            //first create some example roles
            createPermissions(totalRegisters, deletePermissionByPermissionName);
        });
    });

    describe('findPermissionsByRole method', function () {

        before(function(done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            permissionRepository = require("../../app/repository/PermissionRepository").init(sequelize.Permission);
            roleRepository = require("../../app/repository/RoleRepository").init(sequelize.Role);

            var error = function(error) {
                throw error;
            };

            var permissionSyncSuccess = function(success) {

                var roleSyncSuccess = function(success) {

                    done();
                };

                // Create table
                roleRepository.getModel().sync({force: true}).success(roleSyncSuccess).error(error);
            };

            // Create table
            permissionRepository.getModel().sync({force: true}).success(permissionSyncSuccess).error(error);
        });

        it('should find the permissions of a given role', function (done) {

            var error = function(error) {
                logger.warn("error");
                logger.warn(error);
                throw error;
            };

            var successLog = function(success) {
                logger.warn("success log");
                // logger.warn(success);
            }

            var createPermissionsAndRoles = function(totalRegisters, callback) {

                var rolename = 'admin';

                var createRoleSuccess = function(role) {

                    var permissionJson = {
                        'name' : 'prueba1',
                        'httpVerb': 'post',
                        'uri': '/api/users'
                    };

                    var permissionCreteSuccess = function(permission) {

                        role.addPermission(permission).success(function() {

                            callback();

                        }).error(error);
                    }

                    var permissionEntry = permissionRepository.getModel().create(permissionJson)
                    .success(permissionCreteSuccess).error(error);
                }

                var roleEntry = roleRepository.getModel().create({ 'name' : rolename })
                .success(createRoleSuccess).error(error);

            };

            var totalRegisters = 3;

            var permissionName = "prueba1";

            //this is the callback function that gets exectuted after creating example data in db
            var findPermissionsByRoleName = function() {

                var success = function(rolesArray) {

                    rolesArray.length.should.equal(1);
                    
                    var roleOne = rolesArray[0]
                    roleOne.name.should.equal('admin');

                    done();
                };

                permissionRepository.findRolesWhereTheGivenPermissionIsRegistered(permissionName, success, error);
            }

            // First create some example roles and permissions
            createPermissionsAndRoles(totalRegisters, findPermissionsByRoleName);
        });
    });
});
