var Q = require("q");





module.exports = {


	/**
	 * Adds the specified user to the specified game
	 * @param {Object} _options Object{gameId, spotId, userId)
	 */
	addUser :function(_options){
		var deferred = Q.defer();
		var gameId = _options.id;
		var user = _options.user


		/*
		Check whether the _options object contains the required parameters
		 */
		if(gameId === null || user === null) {throw new Error("addUser did not receive the required parameters"); return;}

		/**
		 * Check whether a user.id was specified.
		 */
		if( user.id === undefined ){
			// Generate GUID for the user.
			user.id = utilsService.generateGUID();
		}

		return Game.findOne(gameId)
		.then(function(game){

			if(typeof game === 'undefined') {throw new Error("Game not found")}
			game.users = game.users || [];
			game.spots = game.spots || [];

			if(game.private && game.password !== _options.password){
				throw new Error("password");
				return;
			}
			if(game.numberOfSpots <= game.users.length+1) {
				throw new Error("There is no more space in the game");
				 return;
			}

			// User already exists
			var userExists = _.some(game.users,function(_user) {
				return _user.id === user.id;
			});

			if(!userExists){
				game.users.push({
					id: user.id,
					nickname : user.nickname
				});

				//Add a spot for the given user
				game.spots.push({id: utilsService.generateGUID()});
			}



			/*
			Update the game
			 */
			game.save(function(err){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(game);
            });

            return deferred.promise;
		})
		.catch(function(err) {
			throw err;
		});
	},

	/**
	 * Delete a spot
	 * @param  {[type]} _options [description]
	 * @return {[type]}          [description]
	 */
	deleteUser: function(_options) {
		var deferred = Q.defer();
		var gameId = _options.id;
		var userId = _options.userId;

		/*
		Check whether the _options object contains the required parameters
		 */
		if(gameId === null || userId === null) {throw new Error("deleteUser did not receive the required parameters"); return;}

		return Game.findOne(gameId)
		.then(function(game){


			// Remove spot
			var removals = _.remove(game.users, function(_user){
				return _user.id === userId;
			});

			game.spotsTaken -= removals.length;

			/**
			 * Remove the user from the spot
			 */
			_.forEach(game.spots, function(spot){
              if(spot.user == userId){
              	delete spot.user;
              }
			});
			/*
			Update the game
			 */
			game.save(function(err){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(game);
            });

            return deferred.promise;
		})
		.catch(function(err) {
			return err;
		});
	}
}
