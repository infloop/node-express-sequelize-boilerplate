require.config({
	baseUrl: 'js/',
	paths: {
		jquery: 'lib/jquery/jquery.min',
		underscore: 'lib/underscore/underscore-min',
		backbone: 'lib/backbone/backbone-min',
		bootstrap: 'lib/bootstrap/bootstrap.min',
		handlebars: 'lib/handlebars/handlebars-v1.1.0',
	},
	shim: {
        'bootstrap':{deps: ['jquery']}
    }

});

require([
  'app',
  'bootstrap'
], function(App, Bootstrap){

  App.initialize();

});