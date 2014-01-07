var logger = require("../../config/logger");
var should = require('should');

var userTokenRepository;

var sequelize;

describe('UserToken Repository', function () {

	var createUserTokens = function(total, cb) {
        
		var arrayObjs = [];

		for(var i = 0; i < total ; i++){
			arrayObjs.push({userId: i, token: "prueba"+i});
		}

		var success = function(){
			cb();
		}

		var error = function(err){
			throw err;
		}

		userTokenRepository.getModel().bulkCreate(arrayObjs).success(success).error(error);
	}


	describe('findByToken method', function () {

		beforeEach(function (done) {
			
			sequelize = require("../../app/model");

			//connect to in-memory database
			userTokenRepository = require("../../app/repository/UserTokenRepository").init(sequelize.UserToken);
			
			//create table
			userTokenRepository.getModel().sync({force: true}).success(function(){
				
				done();	

			}).error(function(error){
				throw error;
			});

			
		});

		it('should return a token OK', function (done) {
	
			var totalRegisters = 2;

			var token = "prueba1";

			//this is the callback function that gets executed after creating sample data in db
			var find = function(){
				
				var success = function(result){
					
					if(result){
						result.token.should.equal(token);	
						//here the test ends
						done();
						return;
					}

					//make it fail
					false.should.be.true;
				}

				var error = function(err){
					throw err;
				}

				userTokenRepository.findByToken(token, success, error);
			};

			//first create some example users
			createUserTokens(totalRegisters, find);
		});

		it('should not find any token', function (done) {
	
			var totalRegisters = 2;

			var token = "prueba3";

			//this is the callback function that gets executed after creating sample data in db
			var find = function(){
				
				var success = function(result){
					should.equal(result, null);
					done();
				}

				var error = function(err){
					throw err;
				}

				userTokenRepository.findByToken(token, success, error);
			};

			//first create some example users
			createUserTokens(totalRegisters, find);
			
		});

	});

	describe('createTokenForUser method', function () {

		beforeEach(function (done) {
			
			sequelize = require("../../app/model");

			//connect to in-memory database
			userTokenRepository = require("../../app/repository/UserTokenRepository").init(sequelize.UserToken);
			
			//create table
			userTokenRepository.getModel().sync({force: true}).success(function(){
				
				done();	

			}).error(function(error){
				throw error;
			});

			
		});

		it('create token OK', function (done) {
	
			var userId = 1;
			var type = "web";

			var success = function(result){
				
				if(result){
					result.userId.should.equal(userId);	
					//here the test ends
					done();
					return;
				}

				//make it fail
				false.should.be.true;
			}

			var error = function(err){
				throw err;
			}



			userTokenRepository.createTokenForUser(userId, type, success, error);
			
		});

	});

});
