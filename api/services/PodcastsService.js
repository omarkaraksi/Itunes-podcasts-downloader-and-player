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
	 console.log(results)
	 return results;
	 
	},
	saveSearcResults : function(data){

	},
	proccessFeedData :function(data,callback){
		// console.log(data.results[1],'data')
		var feedurl =[];
		var feeds = [];
		for(var i=0 ;i<=data.results.length-1;i++){
			if(data.results[i].hasOwnProperty('feedUrl')){
				feedurl.push(data.results[i].feedUrl) ;
				
			}
		}
		for(var i=0;i<=feedurl.length-1;i++){
			if(feedurl){
				request.get(feedurl[i],function(err,response,body){
					var isLast = (i == feedurl.length-1) ? true :false ;
					if(body){
						parseString(body,function(err,result){
							if(result){
								callback(JSON.stringify(result),isLast)
							}
									
						})
					}
				})
			}
		}
		
		console.log(feeds,'feeds')
		return feeds ;
		// console.log('urls',feedurl)
	},
	getPreviewUrl :function(data){

	},
	checkIfExitsLocally :function(){

	}
}