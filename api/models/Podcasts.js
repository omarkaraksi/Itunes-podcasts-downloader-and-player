module.exports = {

	attributes : {
		podcast_title: 'STRING',
		podcast_description : 'TEXT',
		podcast_feed_url : 'STRING',
		podcast_tracks_count : 'INTEGER',
		tracks :{
			collection :'tracks',
			via : 'owner'
		}
	}
}