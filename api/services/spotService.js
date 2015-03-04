var Q = require("q");
module.exports = {
	
	/**
	 * Adds the specified user to the specified spot
	 * @param {Object} _options Object{gameId, spotId, userId)
	 */
	addUserToSpot :function(_options){
		var deferred = Q.defer();
		var gameId = _options.id;
		var spotId = _options.spotId;
		var userId = _options.userId;

		var game;

		/*
		Check whether the _options object contains the required parameters
		 */
		if(gameId === null || spotId === null || userId === null) throw new Error("addUserToSpot did not receive the required parameters");

		return Game.findOne(gameId)
		.then(function(model){
			game = model;

			/*
			Check whether the user exist in the game
			 */
			if(!_.some(game.users, function(user){return user.id === userId})) throw new Error("The specified user does not exist in the game");


			/*
			Remove user if he is already in a spot
			 */
			 game.spots.forEach(function(spot){
			 	if(spot.user === userId) delete spot.user;
			 });
			/*
			Add user to the specified spot
			 */
			game.spots.forEach(function(spot){
				if(spot.id === spotId) spot.user = userId;
			});

			/*
			Update the game
			 */
			game.save(function(err, result){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(result);
            });

            return deferred.promise;  
		});
	},

	removeUserFromSpot: function(_options){
		var deferred = Q.defer();
		var gameId = _options.id;
		var spotId = _options.spotId;
		var userId = _options.userId;

		var game;

		/*
		Check whether the _options object contains the required parameters
		 */
		if(gameId === null || spotId === null || userId === null) throw new Error("addUserToSpot did not receive the required parameters");

		return Game.findOne(gameId)
		.then(function(model){
			game = model;

			/*
			Check whether the user exist in the game
			 */
			if(!_.some(game.users, function(user){return user.id === userId})) throw new Error("The specified user does not exist in the game");


			/*
			Remove user if he is already in a spot
			 */
			 game.spots.forEach(function(spot){
			 	if(spot.user === userId) delete spot.user;
			 });

			/*
			Update the game
			 */
			game.save(function(err, result){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(result);
            });

            return deferred.promise;  
		});
	}
}