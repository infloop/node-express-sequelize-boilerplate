var express = require("express");

//logging config
var logger = require("./config/logger");

// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

var app = express();

// bootstrap database connection and save it in express context
app.set("models", require("./app/model"));

//set some global constants
app.set("constants", require("./config/constants"));

// express settings
require('./config/express')(app, config);

// Bootstrap routes
require('./app/route')(app);

//start app on mentioned port
app.listen(config.app.port);

logger.info('listening on port '+config.app.port);