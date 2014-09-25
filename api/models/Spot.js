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
		}
  },

  removeUser: function(id) {
  	Spot.findOne(id).
		exec(function(err, spot){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof spot != 'undefined'){
				spot.update({user: null}, function(err, model){

				});
			}


		})
  }
};

