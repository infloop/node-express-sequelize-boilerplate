
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    loggerLevel: "debug",
    root: rootPath,
    db: {
      host: "localhost",
      port: "3306",
      name: "test",
      user: "test",
      password: "test",
      dialect: "mysql"
    },
    app: {
      name: 'Nodejs Express Sequelize Boilerplate',
      port: 3001
    }
  },
  test: {
    loggerLevel: "info",
    root: rootPath,
    db: {
      dialect: "sqlite"
    },
    app: {
      name: 'Nodejs Express Sequelize Boilerplate TEST',
      port: 3001
    },
  },
  production: {

  }
};