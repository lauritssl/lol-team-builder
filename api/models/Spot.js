/**
* Spot.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	user: {
			model: 'user'
		},
		build: {
			model: 'build'
		},
		champion: {
			type: 'string'
		},

		game: {
			model: 'game'
		}
  },

  removeUser: function(id) {
  	Spot.update({id: id}, {user: null}, function(err, spot){
			if (err) {
				return res.serverError(err);
			}

		})
  }
};

