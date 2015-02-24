/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var async = require('async');

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
 	getAll: function(req, res) {
 		Game.getAll()
 		.spread(function(models) {
 			Game.watch(req);
 			Game.subscribe(req.socket, models);

 			res.json(models);
 		})
 		.fail(function(err) {
			// An error occured
			return res.send(404);
		});
 	},

 	getOne: function(req, res) {
 		Game.getOne(req.param('id'))
 		.spread(function(model) {
 			if(model == null){
 				return res.send(404);
 			}
 			Game.subscribe(req.socket, model);
 			return res.json(model);
 		})
 		.fail(function(err) {
 			return res.send(404);
 		});
 	},

 	create: function (req, res) {
 		var userId = req.param('user');
 		var model = {
 			title: req.param('title'),
 			user: userId,
 			numberOfSpots: req.param('numberOfSpots'),
 			map: req.param('map'),
 			private: req.param('private')
 		};

 		Game
 			.create(model)
 			.exec(function(err, game) {
	 			if (err) {
	 				return res.status(400).json(err);
	 			} else {
	 				Game.publishCreate(game);
	 				return res.json(game);
	 			}
	 		});
 	},
 	destroy: function (req, res) {
 		var id = req.param('id');
 		if (!id) {
 			return res.badRequest('No id provided.');
 		}

		// Otherwise, find and destroy the model in question
		Game.findOne(id).exec(function(err, model) {
			if (err) {
				return res.serverError(err);
			}
			if (!model) {
				return res.notFound();
			}

			Game.destroy(id, function(err) {
				if (err) {
					return res.serverError(err);
				}
				Spot.destroy({game: model.id}).exec(function(err, spots){

				})
				Build.destroy({game: model.id}).exec(function(err, builds){

				})


				Game.publishDestroy(model.id);
				return res.json(model);
			});
		});
	},
	addUser: function (req, res) {
		var user = req.param('user');
		var id = req.param('id');

		if( user.id !== undefined ){
			// Generate GUID for the user.
			user.id = generateGUID();
		}

		Game
			.findOne(id)
			.exec(function(err, game){
				if (err) {
					return res.serverError(err);
				} else if(typeof game != 'undefined'){
					game.spots = game.spots || {};
					game.users = game.users || [];

					game.users.push(user);

					// Create a spot for the user
					var currentNumberOfSpots = Object.keys(game.spots).length;
					game.spots[currentNumberOfSpots] = {};

					game.save(function(err, result){
						if(err){
							return res.json(err);
						} else {
							Game.publishUpdate(game.id,result);
							return res.json(result);
						}
				});
			}
		});
	},
	addUserToSpot : function(req, res){
		var userId = req.param('user');
		var id = req.param('id');
		var spotId = req.param('spotId');
		Game.findOne(id).
		populate("spots").
		exec(function(err, game){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof game != 'undefined'){

				var spot;
				var newUser = false;
				async.series([
					function(callback) {
						Spot.findOne(spotId).exec(function(err,result){
							if (err) {
								callback(err);
							}else if(typeof result.user != 'undefined' && result.user != null && result.user != -1){
								var fakeErr = new Error();
								fakeErr.break = true;
								return callback(fakeErr);

							}else{								
								spot = result;
								callback();
							}
						});
										// body...
									},
									function(callback){
										Spot.update({user: userId}, {user: null}, function(err, model){
											if(model.length < 1) newUser = true;
											callback()
										});
									},
									function(callback){
										spot.user = userId;
										spot.save(function(err, result){
											callback();
										});
									}], function(err){
										if(err){
											return res.serverError("spot already taken");
										}
										if(newUser){
											game.spotsTaken += 1;
											Game.update({id: game.id}, {spotsTaken: game.spotsTaken}, function(err, result){
												Game.republishGame(game.id);
											});
										} else{
											Game.republishGame(game.id);
										}


									})	


}


});

},
removeUserFromSpot: function(req, res) {
	var userId = req.param('userId');
	var id = req.param('id');
	var spotId = req.param('spotId');

	var game;
	async.parallel([
		function(callback) {
			Spot.update({id: spotId}, {user: null}, function(err, spot){
				if(err) callback(err);
				callback();
			});
		},
		function(callback) {
			Game.findOne(id).exec(function(err, result) {
				if(err) callback(err);
				game = result;
				callback()
			})
		}], function(err) {
			if(err) res.serverError(err)
				Game.update({id: id}, {spotsTaken : game.spotsTaken-1}, function(err, game){
					Game.republishGame(id);
				});
		})

},
destroyUser: function (req, res) {
	var userId = req.param('user');
	var id = req.param('id');

	Game.findOne(id).
	populate("spots").
	exec(function(err, game){
		if (err) {
			return res.serverError(err);
		}
		else if(typeof game != 'undefined'){
			Spot.update({user: userId}, {user: null}, function(err, model){
				var users = game.spots.filter(function(spot) {	
					if(typeof spot.user != 'undefined' && spot.user != null) return spot.user.id == userId;
				});
				if(users.indexOf(userId) > -1) game.spotsTaken -= 1;
				game.users.remove(userId)
				game.save(function(err, result){
					console.log(result);
					Game.republishGame(game.id);
				});
				return game;
			});

		}


	});
},

rollBuilds : function(req, res){
	var id = req.param('id')
	var itemsReceived = 0

	var buildRollOptions = {};
	async.paralles([
		function(callback){
			lolDataServie.getGameData(function(err, result){
				if(err) callback(err);
				else{
					buildRollOptions.items = result.items;
					buildRollOptions.champions = result.champions;
					buildRollOptions.summoners = result.summoners;
					buildRollOptions.maps = result.maps;

					callback();
				}
			});	
		}, 
		function(callback){
			Game.getOne(req.param('id'))
 			.spread(function(model) {
 				buildRollOptions.game = model;
 				callback();
 			})
 			.fail(function(err) {
 				callback(err);
 			});
		}
		], function(err){
			if(err) return res.serverError(err);
			
			gameService.rollBuildsForGame(buildRollOptions, function(err, result){
				if (err) {
					return res.serverError(err);
				}

				Game.republishGame(id);
			});
	});

	
},

rerollBuild: function(req, res) {
	var id = req.param('id')
	var spotId = req.param('spotId')


	var buildRollOptions = {};
	buildRollOptions.spotId = spotId;
	async.paralles([
		function(callback){
			lolDataServie.getGameData(function(err, result){
				if(err) callback(err);
				else{
					buildRollOptions.items = result.items;
					buildRollOptions.champions = result.champions;
					buildRollOptions.summoners = result.summoners;
					buildRollOptions.maps = result.maps;

					callback();
				}
			});	
		}, 
		function(callback){
			Game.getOne(req.param('id'))
 			.spread(function(model) {
 				buildRollOptions.game = model;
 				callback();
 			})
 			.fail(function(err) {
 				callback(err);
 			});
		}
		], function(err){
			if(err) return res.serverError(err);
			
			gameService.rollBuildForGame(buildRollOptions, function(err, result){
				if (err) {
					return res.serverError(err);
				}

				Game.republishGame(id);
			});
	});
},

resetBuilds: function(req, res) {
	var id = req.param('id');

	Game.findOne(id).
	exec(function(err, game){
		if (err) {
			return res.serverError(err);
		}
		else if(typeof game != 'undefined'){
			async.parallel([
				function(callback) {
					Spot.update({game: game.id}, {champion: null}, function(err, spot){
						if(err)callback(err);
						callback();
					});
				},
				function(callback) {
					Build.update({game: game.id}, {
						boots: null,
						bootsEnchantment: null, 
						item1: null,
						item2: null,
						item3: null,
						item4: null,
						item5: null,
						mastery1: null,
						mastery2: null,
						mastery3: null,
						summoner1: null,									
						summoner2: null,
						skill_to_level: null}, function(err, spot){
							if(err)callback(err);
							callback();
						});
				}], function(err) {
					if(err){
						console.log(err);
						return res.serverError(err);
					}
					Game.update({id: game.id}, {gameStarted: false}, function(err, model){
						if(err){
							console.log(err);
							return res.serverError(err);
						}else{
							Game.republishGame(game.id);
						}
					})
					
				})


		}


	});
}
};

