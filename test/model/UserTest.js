var logger = require("../../config/logger");
var should = require('should');

var userRepository;

var sequelize;

describe('User model', function () {

    describe('save method', function () {

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

        it('should insert one User', function (done) {

            var success = function(savedUser) {

                // The operation was executed correctly.
                done();
            };

            var error = function(error) {
                logger.warn(error);
            };

            var one = userRepository.build({

                username: 'one',
                email: 'one@domain.com',
                password: 'pwd',
                salt: 'saltedPwd'
            });

            one.save().success(success).error(error);
        });

        it('should not insert two users with the same username', function (done) {

            var success = function(savedUser) {
            };

            var error = function(error) {

                (error.code).should.include('SQLITE_CONSTRAINT');
                done();
            };

            var two = userRepository.build({

                username: 'one',
                email: 'two@domain.com',
                password: 'pwd',
                salt: 'saltedPwd'
            });

            // It fails because the user one is already into the db.
            two.save().success(success).error(error);
        });

        it('should not insert two users with the same email', function (done) {

            var success = function(savedUser) {
            };

            var error = function(error) {

                (error.code).should.include('SQLITE_CONSTRAINT');
                done();
            };

            var three = userRepository.build({

                username: 'three',
                email: 'one@domain.com',
                password: 'pwd',
                salt: 'saltedPwd'
            });

            // It fails because the email one@domain.com is already into the db.
            three.save().success(success).error(error);
        });
    });
});
