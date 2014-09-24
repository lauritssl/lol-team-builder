/**
* Build.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  		title: {
  			type: 'string',
  			required: true
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
  }
};

