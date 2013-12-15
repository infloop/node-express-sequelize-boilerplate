var logger = require("../../config/logger");
var should = require('should');

var roleRepository;

var sequelize;

describe('RoleRepository', function () {

	var createRoles = function(total, cb) {

		var arrayObjs = [];

		for(var i = 0; i < total ; i++) {
			arrayObjs.push({ name: "prueba" + i });
		}
		
        var success = function(){
			cb();
		}

		var error = function(err){
			throw err;
		}

		roleRepository.bulkCreate(arrayObjs).success(success).error(error);
	}


	describe('all method', function () {

		before(function (done) {
			
			sequelize = require("../../app/model");

			//connect to in-memory database
			roleRepository = require("../../app/repository/RoleRepository")(sequelize.Role);
			
			//create table
			roleRepository.sync({force: true}).success(function() {
				
				done();	

			}).error(function(error){
				throw error;
			});

			
		});

		it('should return all roles OK', function (done) {
	
			var totalRegisters = 2;

			//this is the callback function that gets exectuted after creating example data in db
			var find = function(){
				
				var success = function(result){

					result.length.should.equal(totalRegisters);

					result[0].dataValues.id.should.equal(1);
					result[1].dataValues.id.should.equal(2);

					//here the test ends
					done();
				}

				var error = function(err){
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

		before(function (done) {
			
			sequelize = require("../../app/model");

			//connect to in-memory database
			roleRepository = require("../../app/repository/RoleRepository")(sequelize.Role);
			
			//create table
			roleRepository.sync({force: true}).success(function(){
				
				done();	

			}).error(function(error){
				throw error;
			});
		});

		it('should find a role', function (done) {
	
			var totalRegisters = 2;

			var rolename = "prueba1";

			//this is the callback function that gets exectuted after creating example data in db
			var findByRolename = function() {
				
				var success = function(result){

					result.name.should.equal(rolename);

					//here the test ends
					done();
				}

				var error = function(err){
					throw err;
				}


				roleRepository.getRoleByName(rolename, success, error);
			};

			//first create some example roles
			createRoles(totalRegisters, findByRolename);
			
		});
	});
});
