var should = require('should');
var rewire = require("rewire");
var logger = require("../../config/logger");

var constants = require("../../config/constants");

describe('UserBusiness', function () {

    describe('all method', function () {

        it('should return 200 OK', function (done) {

            //attention: it's rewire not require :)
            var userBusiness = rewire("../../app/business/UserBusiness");

            var expectedResult = {
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
                    view.should.equal(constants.getRoutes().users);
                },
                status: function(status) {
                    status.should.equal(expectedStatus);
                    return this;
                },
                json: function(result) {

                    result.should.equal(expectedResult);
                    done();
                }
            };

            /**
             * Mock all needed methods and properties to the element we try to test
             */
            var mocks = function() {

                //mock getRepository function (i.e. the repository). This way, we do not need the database connection
                userBusiness.__set__("repositoryFactory", {
                    getUserRepository: function(req) {
                        return {
                            getAllUsers: function(options, success, error) {
                                success(expectedResult);
                            }
                        }
                    }
                });

                userBusiness.__set__("userResource", {

                    buildList: function(result) {

                        var array = [];
                        array.push(expectedResult);
                        return expectedResult;
                    }
                })

            }

            //set up mocks
            mocks();

            userBusiness.all(request, response);
        });

        it('should return 500 error if something wrong happens at persistence layer', function(done){

            //attention: it's rewire not require :)
            var userBusiness = rewire("../../app/business/UserBusiness");

            var expectedResult = {
                foo: 1
            }

            var expectedStatus = 500;

            var request = {
                param: function(name) {
                    //mocks offset and limit
                    return 10;
                }
            };

            var response = {
                render: function(view, viewData) {
                    view.should.equal(constants.getRoutes().documentType);
                },
                status: function(status) {
                    status.should.equal(expectedStatus);
                    return this;
                },
                json: function(result) {
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
                    getUserRepository: function(req) {
                        return {
                            getAllUsers: function(options, success, error) {
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

    describe('getUserById method', function () {

        it('should return 200 OK', function (done) {

            //attention: it's rewire not require :)
            var userBusiness = rewire("../../app/business/UserBusiness");

            var expectedResult = {
                'username' : 'qwe',
                'password' : 'pwd'
            };

            var expectedStatus = 200;

            var request = {

                params: {
                    'id' : '123'
                }
            };

            var response = {

                status: function(status) {
                    status.should.equal(expectedStatus);
                    return this;
                },

                json: function(result) {
                    result.should.equal(expectedResult);
                    done();
                }
            };

            /**
             * Mock all needed methods and properties to the element we try to test
             */
            var mocks = function() {

                userBusiness.__set__("repositoryFactory", {
                    getUserRepository: function(req) {
                        return {

                            findById: function(username, success, error) {
                                success(expectedResult);
                            }
                        }
                    }
                });

                userBusiness.__set__("userResource" , {

                    build: function(user) {
                        return expectedResult;
                    }
                });
            };

            //set up mocks
            mocks();

            userBusiness.getUserById(request, response);
        });

        it('should return 500 because the user with the given user id does not exist', function (done) {

            //attention: it's rewire not require :)
            var userBusiness = rewire("../../app/business/UserBusiness");

            var expectedResult = {
                'error' : 'there is not a user with username qwe'
            }

            var expectedStatus = 500;

            var request = {

                params: {
                    'id' : '123'
                }
            };

            var response = {

                status: function(status) {
                    status.should.equal(expectedStatus);
                    return this;
                },

                json: function(result) {
                    result.should.equal(expectedResult);
                    done();
                }
            };

            /**
             * Mock all needed methods and properties to the element we try to test
             */
            var mocks = function() {

                userBusiness.__set__("repositoryFactory", {
                    getUserRepository: function(req) {
                        return {

                            findById: function(username, success, error) {
                                error(expectedResult);
                            }
                        }
                    }
                });
            };

            //set up mocks
            mocks();

            userBusiness.getUserById(request, response);
        });
    });

    describe('updateById method', function () {

        it('should return 200 OK', function (done) {

            //attention: it's rewire not require :)
            var userBusiness = rewire("../../app/business/UserBusiness");

            var expectedResult = "OK";
            var expectedStatus = 200;

            var request = {

                params: {
                    'id' : '123'
                },

                body: {
                    'username' : 'qwe',
                    'password' : 'pwd',
                    'email' : 'qwe@domain.com'
                }
            };

            var response = {

                status: function(status) {
                    status.should.equal(expectedStatus);
                    return this;
                },

                json: function(result) {
                    result.should.equal(expectedResult);
                    done();
                }
            };

            /**
             * Mock all needed methods and properties to the element we try to test
             */
            var mocks = function() {

                userBusiness.__set__("repositoryFactory", {
                    getUserRepository: function(req) {
                        return {
                            updateById: function(username, user, success, error) {
                                success(expectedResult);
                            }
                        }
                    }
                });
            };

            //set up mocks
            mocks();

            userBusiness.updateUserById(request, response);
        });
    });

    describe('deleteUserById method', function () {

        it('should return 200 OK', function (done) {

            //attention: it's rewire not require :)
            var userBusiness = rewire("../../app/business/UserBusiness");

            var expectedResult = "OK";
            var expectedStatus = 200;

            var request = {

                params: {
                    'id' : '123'
                }
            };

            var response = {

                status: function(status) {
                    status.should.equal(expectedStatus);
                    return this;
                },

                json: function(result) {
                    result.should.equal(expectedResult);
                    done();
                }
            };

            /**
             * Mock all needed methods and properties to the element we try to test
             */
            var mocks = function() {

                userBusiness.__set__("repositoryFactory", {
                    getUserRepository: function(req) {
                        return {
                            deleteById: function(username, success, error) {
                                success(expectedResult);
                            }
                        }
                    }
                });
            };

            //set up mocks
            mocks();

            userBusiness.deleteUserById(request, response);
        });
    });
});
