/**
* Tracks.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  //connection :'redis',
  attributes: {
    'id' :{
      columnName : 'tracks_id',
      primaryKey: true,
      type : 'INTEGER'
    },
  	'track_title':'STRING',
  	'track_mp3_url':'STRING',
  	'track_length':'FLOAT',
    podcasts: {
      type: 'INTEGER',
      columnName: 'podcasts_id',
      model: 'Podcasts'
    },
  }
};
