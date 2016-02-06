var request = require('request');
var configs = sails.config.configs;
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
		var isNew = req.query.isNew || false
		// console.log(isNew,'new')
		PodcastsService.search(term,entity,
			function(body){
				data = body;
				PodcastsService.saveSearcResults(body,
					function(err,results){
						//console.log(err,results,'sssssssss');
						PodcastsService.proccessFeedData(results,
							function(feed,isLast,podcastId){
								feed =JSON.parse(feed)

								var isLast = configs.podcasts_limit;
							//	console.log('is_last',isLast)

									PodcastsService.ParseAndSaveFeed(feed,podcastId,function(proccesedResults){
										// if(isLast){
											if(isNew){
												//console.log("Thats Newewewe")
												PodcastsService.searchPodcasts(term,function(results){
														console.log(1)
													//res.write();
													res.end(JSON.stringify(results))
												})
											}else if(!isNew && isLast){
												console.log(2)
												 res.end(JSON.stringify({'msg':'doneIndexing'}))
											}else{
												console.log(3)
												res.end(JSON.stringify({'msg':'err'}))
											}

										// }

									})

								//res.json({'msg':'doneIndexing2'})
							})


					});
			}
		);
		//res.end()
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
		,limit:65},function(err,results){
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
			Tracks.find({owner:podId,limit:50},function(err,results){
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
