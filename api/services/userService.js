var Q = require("q");



 var generateGUID = function() {
 	function s4() {
 		return Math.floor((1 + Math.random()) * 0x10000)
 		.toString(16)
 		.substring(1);
 	}
 	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
 	s4() + '-' + s4() + s4() + s4();
 }


module.exports = {
	
	
	/**
	 * Adds the specified user to the specified game
	 * @param {Object} _options Object{gameId, spotId, userId)
	 */
	addUser :function(_options){
		var deferred = Q.defer();
		var gameId = _options.id;
		var user = _options.user
		/**
		 * Prepare game variable for later use.
		 */
		var game;

		/*
		Check whether the _options object contains the required parameters
		 */
		if(gameId === null || user === null) throw new Error("addUser did not receive the required parameters");

		/**
		 * Check whether a user.id was specified.
		 */
		if( user.id === undefined ){
			// Generate GUID for the user.
			user.id = generateGUID();
		}

		return Game.findOne(gameId)
		.then(function(model){
			game = model;
			game.users = game.users || [];
			game.spots = game.spots || [];


			if(game.numberOfSpots <= game.users.length+1) throw new Error("There is no more space in the game");
			
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
				game.spots.push({id: generateGUID()});
			}

			

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


		return Game.findOne(gameId)
		.then(function(model){
			game = model;


			// Remove spot
			var removals = _.remove(game.users, function(_user){
				return _user.id === userId;
			});			

			game.spotsTaken -= removals.length;
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
		})
		.catch(function(err) {
			return err;
		});
	}
}