var should = require('should');
var rewire = require("rewire");

var constants = require("../../config/constants");

describe('UserBusiness', function () {

	describe('all method', function () {

		it('should return 200 OK', function (done) {

			//attention: it's rewire not require :)
			var userBusiness = rewire("../../app/business/UserBusiness");

			var expectedResult= {
				foo: 1
			}

			var expectedStatus = 200;

			var request = {
				param: function(name){
					//mocks offset and limit
					return 10;
				}
			};

			var response = {
			    render: function(view, viewData) {
			        view.should.equal(constants.routes.users);
			    },
			    send: function(result){
			    	result.should.equal(expectedResult);
			    },
			    status: function(status){
			    	status.should.equal(expectedStatus);
			    	return this;
			    }
			};

			/**
			 * Mock all needed methods and properties to the element we try to test
			 */
			var mocks = function(){

				//mock getRepository function (i.e. the repository). This way, we do not need the database connection
				userBusiness.__set__("repositoryFactory", {
						getUserRepository: function(req){
							return {
								all: function(options, success, error){
									success(expectedResult);
								}
							}
						}
				});
			}

			//set up mocks
			mocks();

			userBusiness.all(request, response);

			done();
		});
		
		it('should return 500 error if something wrong happens at persistence layer', function(done){

			//attention: it's rewire not require :)
			var userBusiness = rewire("../../app/business/UserBusiness");

			var expectedResult= {
				foo: 1
			}

			var expectedStatus = 500;

			var request = {
				param: function(name){
					//mocks offset and limit
					return 10;
				}
			};

			var response = {
			    render: function(view, viewData) {
			        view.should.equal(constants.routes.documentType);
			    },
			    status: function(status){
			    	status.should.equal(expectedStatus);
			    	return this;
			    },
			    send: function(result){
			    	result.should.equal(expectedResult);
			    	done();
			    }
			};

			/**
			 * Mock all needed methods and properties to the element we try to test
			 */
			var mocks = function(){

				//mock getRepository function (i.e. the repository). This way, we do not need the database connection
				userBusiness.__set__("repositoryFactory", {
						getUserRepository: function(req){
							return {
								all: function(options, success, error){
									error(expectedResult);
								}
							}
						}
				});
			}

			//set up mocks
			mocks();

			userBusiness.all(request, response);
		});
	});
});