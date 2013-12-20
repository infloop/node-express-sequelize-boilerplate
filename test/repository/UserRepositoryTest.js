var logger = require("../../config/logger");
var should = require('should');

var userRepository;

var sequelize;

describe('UserRepository', function () {

	var createUsers = function(total, cb){

		var arrayObjs = [];

		for(var i = 0; i < total ; i++) {
			arrayObjs.push({ username: "prueba" + i });
		}

		var success = function(){
			cb();
		}

		var error = function(err){
			throw err;
		}

		userRepository.bulkCreate(arrayObjs).success(success).error(error);
	}

	describe('all method', function () {

		before(function (done) {
			
			sequelize = require("../../app/model");

			//connect to in-memory database
			userRepository = require("../../app/repository/UserRepository")(sequelize.User);
			
			//create table
			userRepository.sync({force: true}).success(function() {
				
				done();	

			}).error(function(error) {
				throw error;
			});
		});

		it('should return all users OK', function (done) {
	
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

				userRepository.getAllUsers(options, success, error);
			};

			//first create some example users
			createUsers(totalRegisters, find);
			
		});

	});

	describe('findById method', function () {

		before(function (done) {
			
			sequelize = require("../../app/model");

			//connect to in-memory database
			userRepository = require("../../app/repository/UserRepository")(sequelize.User);
			
			//create table
			userRepository.sync({force: true}).success(function(){
				
				done();	

			}).error(function(error) {
				throw error;
			});
		});

		it('should find a user', function (done) {
	
			var totalRegisters = 2;

			var id = 1;

			//this is the callback function that gets exectuted after creating example data in db
			var findById = function() {
				
				var success = function(result) {

					result.username.should.equal('prueba0');

					//here the test ends
					done();
				}

				var error = function(err) {
					throw err;
				}

				userRepository.findById(id, success, error);
			};

			//first create some example users
			createUsers(totalRegisters, findById);
		});
	});

    describe('updateById method', function () {

		before(function (done) {
			
			sequelize = require("../../app/model");

			//connect to in-memory database
			userRepository = require("../../app/repository/UserRepository")(sequelize.User);
			
			//create table
			userRepository.sync({force: true}).success(function() {
				done();	

			}).error(function(error) {
				throw error;
			});
		});

		it('should return success and the modified user', function (done) {

            var numeroUsuarios = 5;

            var verifyUserWasUpdated = function() {

                var success = function(success) {

                    var findSuccess = function(result) {

                        result.password.should.equal(updatedUser.password);
                        result.email.should.equal(updatedUser.email);
                        done();
                    };

                    var findError = function(error) {
                        logger.warn("************** 1");
                        throw error;
                    };

                    userRepository.findById(id, findSuccess, findError);
                };

                var error = function(error) {
                    logger.warn("************** 2");
                    logger.warn(error);
                    throw error;
                };

                userRepository = require("../../app/repository/UserRepository")(sequelize.User);
                var id = 2;

                var updatedUser = {
                    'username' : 'prueba12',
                    'password' : 'pwd',
                    'email' : 'prueba123@domain.com'
                };
                
                userRepository.updateById(id, updatedUser, success, error);
            };

            createUsers(numeroUsuarios, verifyUserWasUpdated);
        });
    });

    describe('deleteById method', function () {

		before(function (done) {
			
			sequelize = require("../../app/model");

			//connect to in-memory database
			userRepository = require("../../app/repository/UserRepository")(sequelize.User);
			
			//create table
			userRepository.sync({force: true}).success(function() {
				done();	

			}).error(function(error) {
				throw error;
			});
		});

		it('should return success and the number of users should decrease by one', function (done) {

            var numeroUsuarios = 5;

            var verifyUserWasDeleted = function() {

                var success = function(success) {

                    userRepository.count().success(function(result) {

                        result.should.equal(numeroUsuarios - 1);
                        done();
                    });
                };

                var error = function(error) {
                    throw error;
                };

                userRepository = require("../../app/repository/UserRepository")(sequelize.User);
                var id = 2;
                userRepository.deleteById(id, success, error);
            };

            createUsers(numeroUsuarios, verifyUserWasDeleted);
        });
    });
});
