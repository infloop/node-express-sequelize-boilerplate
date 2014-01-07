var logger = require("../../config/logger");
var rewire = require("rewire");
var should = require('should');

var roleRepository;
var permissionRepository;

var sequelize;

describe('RoleRepository', function () {

    var error = function(err) {

        logger.warn('Error!!!!!!!!!!!!!!!!!!');
        logger.warn(err);
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

        roleRepository.getModel().bulkCreate(arrayObjs).success(success).error(error);
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

        permissionRepository.bulkCreate(permissionsArray).success(success).error(error);
    };

    var createRolesAndPermissions = function(numberOfPermissionsPerRole, callback) {

        var role = {
            name: 'admin'
        };

        roleRepository.getModel().create(role).success(function(createdRole) {

            var k = 0;

            for (var i = 0; i < numberOfPermissionsPerRole; i++) {

                var permission = {

                    name: 'prueba' + i,
                    httpVerb: 'verb' + i,
                    uri: '/api/resource-x/' + i
                };
                
                permissionRepository.getModel().create(permission).success(function(createdPermission) {

                    createdRole.addPermission(createdPermission).success(function() {

                        k++;

                        if (k == (numberOfPermissionsPerRole - 1)) {
                            callback();
                        }
                    });
                });
            }
        });
    };

    describe('all method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            roleRepository = require("../../app/repository/RoleRepository")
            roleRepository.init(sequelize.Role);

            //create table
            roleRepository.getModel().sync({force: true}).success(function() {

                done();	

            }).error(error);

        });

        it('should return all roles OK', function (done) {

            var totalRegisters = 2;

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
            roleRepository = require("../../app/repository/RoleRepository")
            roleRepository.init(sequelize.Role);

            //create table
            roleRepository.getModel().sync({force: true}).success(function(){

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

    describe('updateRole method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            roleRepository = require("../../app/repository/RoleRepository")
            roleRepository.init(sequelize.Role);

            permissionRepository = require("../../app/repository/PermissionRepository").init(sequelize.Permission);

            // Create roles table
            roleRepository.getModel().sync({force: true}).success(function(){

            }).error(error);

            // Create permissions table
            permissionRepository.getModel().sync({force: true}).success(function(){

                done();

            }).error(error);
        });

        it('should update a role', function (done) {

            var totalRegisters = 3;

            var roleId = 1;
            var updatedRoleName = 'admin';

            var updatedRole = {

                id: roleId,
                name: updatedRoleName,
            };

            var permissionsIdList = [1, 2, 3, 4];

            roleRepository = rewire("../../app/repository/RoleRepository");
            roleRepository.init(sequelize.Role);

            var mocks = function() {

                roleRepository.__set__("repositoryFactory", {

                    getPermissionRepository: function() {

                        return permissionRepository;
                    }
                });
            };

            mocks();

            //this is the callback function that gets exectuted after creating example data in db
            var updateByRoleCallback = function() {

                var success = function(success) {

                    var findSuccess = function(result) {

                        result.name.should.equal(updatedRoleName);
                        done();
                    };

                    var findError = function(error) {
                        logger.warn('********************** 1');
                        logger.warn(error);
                        throw error;
                    };

                    roleRepository.getRoleById(roleId, findSuccess, findError);
                }

                var error = function(err) {
                    logger.warn('********************** 2');
                    logger.warn(err)
                    throw err;
                }

                roleRepository.updateRole(updatedRole, permissionsIdList, success, error);
            };

            //first create some example roles
            createRolesAndPermissions(totalRegisters, updateByRoleCallback);
        });
    });

    describe('deleteRole method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            roleRepository = require("../../app/repository/RoleRepository")
            roleRepository.init(sequelize.Role);

            permissionRepository = require("../../app/repository/PermissionRepository").init(sequelize.Permission);

            // Create roles table
            roleRepository.getModel().sync({force: true}).success(function(){

            }).error(error);

            // Create permissions table
            permissionRepository.getModel().sync({force: true}).success(function(){

                done();

            }).error(error);
        });

        it('should delete a role', function (done) {

            var totalRegisters = 3;
            var roleId = 1;

            //this is the callback function that gets exectuted after creating example data in db
            var deleteRoleCallback = function() {

                var success = function(success) {

                    roleRepository.getModel().count().success(function(result) {

                        result.should.equal(totalRegisters - 1);
                        done();
                    });
                }

                var error = function(err) {
                    throw err;
                }

                roleRepository.deleteRole(roleId, success, error);
            };

            //first create some example roles
            createRoles(totalRegisters, deleteRoleCallback);
        });

        it('should remove the permissions of the given role', function (done) {

            var numberOfPermissions = 3;
            var roleId = 2;

            var findRolePermissions = function() {

                var deleteSuccess = function() {

                    var success = function() {

                        throw "shouldn't be here because there is no role with name admin."
                    };

                    var deleteError = function(error) {

                        // Expect to be here because there is no role with name admin
                        done();
                    }

                    roleRepository.getRolePermissions(roleId, success, deleteError);
                };

                roleRepository.deleteRole(roleId, deleteSuccess, error);
            };

            createRolesAndPermissions(numberOfPermissions, findRolePermissions);
        });
    });

    describe('getRolePermissions method', function () {

        before(function (done) {

            sequelize = require("../../app/model");

            //connect to in-memory database
            roleRepository = require("../../app/repository/RoleRepository")
            roleRepository.init(sequelize.Role);

            permissionRepository = require("../../app/repository/PermissionRepository").init(sequelize.Permission);

            // Create roles table
            roleRepository.getModel().sync({force: true}).success(function(){

            }).error(error);

            // Create permissions table
            permissionRepository.getModel().sync({force: true}).success(function(){

                done();

            }).error(error);
        });

        it('should return the permissions of the given role', function (done) {

            var numberOfPermissions = 3;
            var roleName = 'admin';

            var findRolePermissions = function() {

                var findSuccess = function(permissionsArray) {

                    permissionsArray.length.should.equal(numberOfPermissions);

                    var permissionOne = permissionsArray[0];
                    permissionOne.name.should.equal('prueba0');

                    done();
                };

                roleRepository.getRolePermissions(roleName, findSuccess, error);
            };

            createRolesAndPermissions(numberOfPermissions, findRolePermissions);
        });
    });
});
