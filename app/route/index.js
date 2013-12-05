var userRoutes = require("./UserRoutes");

/**
 * Main function to bootstrap all routes of this app
 */
module.exports = function (app, passport) {
	
	//index page
	app.get("/", function(req, res){
		res.render('index');
	});

	//index page
	app.get("/login", function(req, res){
		res.render('login');
	});

	//user resources
	userRoutes(app, passport);

}
