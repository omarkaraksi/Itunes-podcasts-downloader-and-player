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
				PodcastsService.saveSearcResults(body,
					function(err,results){
						console.log(results);
						PodcastsService.proccessFeedData(results,
							function(feed,isLast,podcastId){
								feed =JSON.parse(feed)
								
								PodcastsService.ParseAndSaveFeed(feed,podcastId)
								
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

						var d = {}
						//console.log(results)
						d.track_title = 'testt';
						d.track_mp3_url = "test.mp3",
						d.owner = results.id;
						Tracks.create(d,function(err,results){
							//console.log(results)
						})
					});
			}
		);

	},


		
}
module.exports = PodcastsController