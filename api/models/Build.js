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
  		},
  		boots: {
  			type:  'string'
  		},
      bootsEnchantment: {
        type:  'string'
      },
  		item1: {
  			type:  'string'
  		},
  		item2: {
  			type:  'string'
  		},
  		item3: {
  			type:  'string'
  		},
  		item4: {
  			type:  'string'
  		},
  		item5: {
  			type:  'string'
  		},
  		skill_to_level: {
  			type: 'string',
  			enum: ['Q', 'W', 'E']
  		},
  		summoner1: {
  			type: 'string'
  		},
  		summoner2: {
  			type: 'string'
  		},
  		mastery1: {
  			type: 'integer'
  		},
  		mastery2: {
  			type: 'integer'
  		},
  		mastery3: {
  			type: 'integer'
  		}
  },

  rollBuild : function(id, items){
    var boots = items[1001];
    Build.findOne(id)
    .exec(function(err, build){
      if (err) {
        return res.serverError(err);
      }
        else if(typeof build != 'undefined'){

      }
    })
  },
  rollBoots: function(id, items){

  }
};

