var Sequelize = require('sequelize');
var logger = require("../../config/logger");

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development';

var config = require('../../config/config')[env];

// initialize database connection
logger.debug('Connecting to engine:'+config.db.dialect+" dbName: "+config.db.name+'...');

var sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
	// custom host; default: localhost
	host: config.db.host,

	// custom port; default: 3306
	port: config.db.port,

	// max concurrent database requests; default: 50
	maxConcurrentQueries: 100,

	// the sql dialect of the database
	dialect: config.db.dialect,

	// use pooling in order to reduce db connection overload and to increase speed
	// currently only for mysql and postgresql (since v1.5.0)
	pool: { maxConnections: 5, maxIdleTime: 30},

	// language is used to determine how to translate words into singular or plural form based on the [lingo project](https://github.com/visionmedia/lingo)
	// options are: en [default], es
	language: 'en',

	logging: logger.debug
});

// load models
var models = [
	"User",
	"UserToken",
	"Role",
	"Permission"
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {

  m.User.belongsTo(m.Role);
  m.Role.hasMany(m.Permission, {onDelete: 'cascade'});
  m.Permission.hasMany(m.Role, {onDelete: 'cascade'});
  m.UserToken.belongsTo(m.User);

})(module.exports);


sequelize.sync(
	//{force: true}
	)
	.error(function(error){
		logger.error(error);
		throw error;
	});

// export connection
module.exports.sequelize = sequelize;
