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

	express: {
		customMiddleware: function(app) {

			// var redis = require('redis');
			// var client = redis.createClient(17907, 'pub-redis-17907.us-east-1-2.1.ec2.garantiadata.com', {no_ready_check: true});
			// client.auth(')neverforgetyourpassword(', function (err) {
			//     if (err)  
			//     	throw err;
			// });

			// client.on('connect', function() {
			//     console.log('Connected to Redis');
			// });




			var express = require('express');
			
			app.use(express['static'](process.cwd() + '/api'));
			app.use(app.router);;
			app.use(express.csrf());	
		}
	}

};