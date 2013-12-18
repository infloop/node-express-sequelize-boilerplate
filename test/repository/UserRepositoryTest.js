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

	describe('findByUsername method', function () {

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

			var username = "prueba1";

			//this is the callback function that gets exectuted after creating example data in db
			var findByUsername = function() {
				
				var success = function(result) {

					result.username.should.equal(username);

					//here the test ends
					done();
				}

				var error = function(err) {
					throw err;
				}


				userRepository.findByUsername(username, success, error);
			};

			//first create some example users
			createUsers(totalRegisters, findByUsername);
			
		});

	});

});
