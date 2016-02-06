var request = require('request');
var parseString = require('xml2js').parseString;
var configs = sails.config.configs;
module.exports = {

	search : function(term,entity,callback){


	 var term   = term!='' ?  "?term="+term : "" ;
	 var entity = entity!='' ?  "&entity="+entity : "";
	 //console.log(entity)
	 //sleep(4000)
	 var limit =  "&limit="+configs.podcasts_limit ;
	 if(term){
	 	var results = [];
	 	var url = "https://itunes.apple.com/search"+term+entity+limit
	 	request.get(url.toString(),
		 	function(err,response,body){
		 		data = JSON.parse(body);
		 		callback(data);
		 	}
		)

	 }
	},
	saveSearcResults : function(data,callback){
		var results = data.results ;
		for(i=0;i<results.length;i++){
			var inserts = {};
			inserts.podcast_title = results[i].collectionName || '';
			inserts.podcast_description =results[i].collectionName || '';
			inserts.podcast_feed_url = results[i].feedUrl || '';
			inserts.podcast_tracks_count = results[i].trackCount || '' ;
			Podcasts.findOrCreate({'podcast_title':inserts.podcast_title}, inserts,callback);

		}


	},
	searchPodcasts :function(term,callback){
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
				callback(results)
		})
	},
	proccessFeedData :function(feed,callback){
		// console.log(data.results[1],'data')
		var feed = feed || '';
		if(feed){

			var feedurl =feed.podcast_feed_url
			var feeds = [];

			request.get(feedurl,function(err,response,body){

				if(body){
					parseString(body,function(err,result){
						if(result){
							var isLast = (body.length-1 ==configs.podcasts_limit) ? true :false ;
							callback(JSON.stringify(result),isLast,feed.id)
						}

					})
				}
			})

		}

	},
	ParseAndSaveFeed :function(feed,PodcastsId,callback){
		var items = []

		//console.log(feed,'ss')
		if(feed && feed.rss){
			var channel = feed.rss.channel[0] || undefined
			if(channel){
				var ch_item = channel.item || 0
				var _items = ch_item
				if(_items){
				//	console.log(ch_item,"itemsssss")
					var l = (configs.tracks_limit > _items.length) ? _items.length :  configs.tracks_limit
					for(var i=0;i<l;i++){
						var itm = {};
						if(typeof _items[i]!=='undefined'){
							if(typeof _items[i].enclosure!=='undefined' && _items[i].enclosure.length>0){
								itm.track_mp3_url = _items[i].enclosure[0].$.url;
								itm.track_title   = _items[i].title ;
								itm.track_length  = _items[i].enclosure[0].$.track_length;
								itm.owner = PodcastsId;
								//console.log(PodcastsId)
								Tracks.findOrCreate({'track_title':itm.track_title},itm,function(err,res){
									if(res)
									  callback(res)
								})
							}
						}
					}
					//console.log(items)
					//console.log(channel.item[0].enclosure[0].$.url);
				}
			}

		}
	},
	getPreviewUrl :function(data){

	},
	checkIfExitsLocally :function(){

	}
}
