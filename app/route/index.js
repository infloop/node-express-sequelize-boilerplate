//var userRoutes = require("../UserRoutes");

/**
 * Main function to bootstrap all routes of this app
 */
module.exports = function (app) {
	
	//index page
	app.get("/", function(req, res){
		res.send("{test:test, test2:test2}");
	});

	//userRoutes(app);

}
