/**
* Build.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var request = require("request");

module.exports = {

  attributes: {
  		title: {
  			type: 'string',
  			required: true
  		},
      champion: {
        type: 'string',
      },
  		boots: {
  			type:  'number'
  		},
  		item1: {
  			type:  'number'
  		},
  		item2: {
  			type:  'number'
  		},
  		item3: {
  			type:  'number'
  		},
  		item4: {
  			type:  'number'
  		},
  		item5: {
  			type:  'number'
  		},
  		skill_to_level: {
  			type: 'string',
  			enum: ['Q', 'W', 'E', 'R']
  		},
  		summoner1: {
  			type: 'string'
  		},
  		summoner2: {
  			type: 'string'
  		},
  		mastery1: {
  			type: 'number'
  		},
  		mastery2: {
  			type: 'number'
  		},
  		mastery3: {
  			type: 'number'
  		}
  },

  rollBuild: function(id) {


    var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/champion.json';
    
    request({
      url: url,
      json: true
    }, function(error, response, body){
       if (!error && response.statusCode === 200) {
         // Print the json response
    }
    })
  }
};

