/**
 * SpotController
 *
 * @description :: Server-side logic for managing spots
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	addUserToSpot : function(req, res){
		var userId = req.param('user');
		var id = req.param('id');
		var gameId = req.param('gameId');
		Spot.findOne(id).
		populate("users").
		exec(function(err, game){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof game != 'undefined'){
				Spot.users.add(userId)
				Spot.save(function(err, result){
					Game.publishUpdate(gameId,result);
				res.json(result);
				});

			}


		});

	}
};

