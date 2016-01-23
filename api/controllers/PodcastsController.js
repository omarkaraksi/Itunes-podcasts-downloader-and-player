var request = require('request');
var PodcastsController = {
	index :function(req,res){
		//console.log(req)	
		return res.json({
		 	//'data' : 'Podcasts Test'
		})
	},
	search :function(req,res){
		var term = req.query.term || ''
		var entity = req.query.entity || ''
		var data = {};
		PodcastsService.search(term,entity,
			function(body){
				data = body;
				
				PodcastsService.proccessFeedData(body,
					function(feed,isLast){
						feed =JSON.parse(feed)
						
						console.log(feed.rss.channel[0].item[0].enclosure[0].$.url);
						
						if(!isLast){

							//res.write(feed)
						}else{
							//console.log(feed.rss.channel[0].item[0].enclosure)
							//res.write(feed.rss)
							//res.setHeader('Content-Type', 'application/json');
							res.end()
						}
					}	
				)
				
				
				
			}
		);

	},


		
}
module.exports = PodcastsController