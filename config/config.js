module.exports = {
  development: {
    loggerLevel: "debug",
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