var request = require('request');
var parseString = require('xml2js').parseString;
module.exports = {

	search : function(term,entity,callback){
	 var term =  term!='' ? '?term='+term : '';
	 var entity = entity!='' ? '&entity='+entity : '';
	 var limit =  '&limit=50' ;
	 if(term){
	 	var results = [];
	 	request.get("https://itunes.apple.com/search"+term+entity+limit,
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
			Podcasts.create(inserts,callback);
			
		}
		
		
	},
	proccessFeedData :function(feed,callback){
		// console.log(data.results[1],'data')
		var feedurl =feed.podcast_feed_url
		var feeds = [];
	
		request.get(feedurl,function(err,response,body){
			var isLast = (i == feedurl.length-1) ? true :false ;
			if(body){
				parseString(body,function(err,result){
					if(result){
						callback(JSON.stringify(result),isLast,feed.id)
					}
							
				})
			}
		})

	},
	ParseAndSaveFeed :function(feed,PodcastsId){
		var items = []	
		if(feed && feed.rss){

			var channel = feed.rss.channel[0] || undefined
			if(channel){
				var _items = (channel.item.length>0 ) ? channel.item : 0
				if(_items){
					for(var i=0;i<_items.length;i++){
						var itm = {};
						if(typeof _items[i]!=='undefined'){
							if(typeof _items[i].enclosure!=='undefined' && _items[i].enclosure.length>0){
								itm.track_mp3_url = _items[i].enclosure[0].$.url;
								itm.track_title   = _items[i].title ; 
								itm.track_length  =  _items[i].enclosure[0].$.track_length;
								itm.owner = PodcastsId;
								console.log(PodcastsId)
								Tracks.create(itm,function(err,res){
									if(res)
									  console.log(res)
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