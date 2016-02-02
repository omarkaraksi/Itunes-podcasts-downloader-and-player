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


					});
			}
		);
		res.end()
	},
	searchPodcasts :function(req,res){
		var term     = req.query.term;
		var mypodCasts = Podcasts.find({
			or : [
				{'podcast_title' : term},
				{
				'podcast_title' : {
					'contains' : term
				 }
				},
				{
				'podcast_title' : {
					'like' : '%'+term
				 }
				},
				{'podcast_title' : {
					'like' : term+'%'
					},
				}
			]
		,limit:10},function(err,results){
			res.json(results)
		})
	},
	searchTracks :function(req,res){
		var podId 		=  req.query.id || null ;

		var tracktitle =  req.query.title || null;
		console.log(tracktitle);
		var findby = [];
		var findyId = {}
		if(podId){
			Tracks.find({'owner':podId,limit:12},function(err,results){
				res.json(results)
			})
		}else if(tracktitle){
			findby.push(
				{	'track_title' : tracktitle},
				{
					'track_title' : {
						'contains' : tracktitle
					}
				},
				{
				    'track_title' : {
						'like' : '%'+tracktitle
					}
				},
				{
					'track_title' : {
						'like' : tracktitle+'%'
				 	}
				}
			)

			Tracks.find({'or':findby,limit:12},function(err,results){
				res.json(results)
			})

		}



	},
	searchTracksById :function(req,res){

	}


}
module.exports = PodcastsController
