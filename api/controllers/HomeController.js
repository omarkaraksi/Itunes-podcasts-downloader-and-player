/*---------------------
	:: Home
	-> controller
---------------------*/
var HomeController = {

	index: function(req,res) {
		return res.json({
			description: 'This is a SailsJS / AngularJS Application'
		});
	}

};
module.exports = HomeController;
