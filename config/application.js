module.exports = {

	// Name of the application (used as default <title>)
	appName: "Sails Application",

	// Port this Sails application will live on
	port: 1339,

	// The environment the app is deployed in
	// (`development` or `production`)
	//
	// In `production` mode, all css and js are bundled up and minified
	// And your views and templates are cached in-memory.  Gzip is also used.
	// The downside?  Harder to debug, and the server takes longer to start.
	environment: 'development',

	// Logger
	// Valid `level` configs:
	//
	// - error
	// - warn
	// - debug
	// - info
	// - verbose
	//
	log: {
		level: 'info'
	},

	http: {
		customMiddleware: function(app) {

			var express = require('express');
			app.use(express['static'](process.cwd() + '/api'));
			app.use(app.router);

			// app.get('/*',function(req,res,next){
			// 	req.header('Keep-Alive','timeout=15, max=5000');
			// 	req.header('Connection' ,'Keep-Alive');
			// 	next();
			// })
			app.use(express.csrf());
		}
	},

};
