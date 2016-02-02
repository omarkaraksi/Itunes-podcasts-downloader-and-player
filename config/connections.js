module.exports.connections = {
	redis :{
		adapter		: 'sails-redis',
		host		: 'pub-redis-17907.us-east-1-2.1.ec2.garantiadata.com',
		password	: ')neverforgetyourpassword(',
		port		:  17907,
		no_ready_check :true

	},
	someMongoDb: {
    adapter: 'sails-mongo',
    host: 'ds051595.mongolab.com', // defaults to `localhost` if omitted
    port: 51595, // defaults to 27017 if omitted
    user: 'karaksi', // or omit if not relevant
    password: '0neverforgetyourpassword0', // or omit if not relevant
    database: 'sails-podcasts' // or omit if not relevant
  }
}
