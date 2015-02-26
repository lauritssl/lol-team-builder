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
 		var userDto = req.param('user');

 		var user = {};
 		user.id = generateGUID();
 		user.nickname = userDto.nickname;

 		var model = {
 			title: req.param('title'),
 			user: user,
 			users: [],
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

		if( user.id === undefined ){
			// Generate GUID for the user.
			user.id = generateGUID();
		}

		Game
		.findOne(id)
		.exec(function(err, game){
			if (err) {
				return res.serverError(err);
			} else if(typeof game != 'undefined'){
				game.spots = game.spots || [];
				game.users = game.users || [];

					// User already exists
					var userExists = _.filter(game.users, function(_user){
						return _user.id === user.id;
					});

					if( userExists.length === 0 ){

						game.users.push({
							id: user.id,
							nickname : user.nickname
						});
						// Create a spot for the user
						game.spots.push({id: game.spots.length+1});
					}
					

					game.save(function(err, result){
						if(err){
							return res.json(err);
						} else {
							Game.publishUpdate(game.id,result);
							return res.json(user);
						}
					});
				}
			});
	},
	addUserToSpot : function(req, res){
		var userId = req.param('user');
		var id = req.param('id');
		var spotId = req.param('spotId');
		

		var options = {
			userId: userId,
			id : id,
			spotId : spotId
		}
		spotService.addUserToSpot(options)
		.then(function(result){
			Game.publishUpdate(id, result);
		})
		.catch(function(err){
			return res.serverError(err);
		})

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
		var user = req.param('user');
		var id = req.param('id');


		Game
		.findOne(id)
		.exec(function(err, game){
			if (err) {
				return res.serverError(err);
			} else if(typeof game != 'undefined'){

				// Free spot
				var userIndex = game.spots.indexOf(user);
				if( userIndex > -1 ){
					game.spots.splice(userIndex, 1);
				}

				// Remove user
				var userIndex = _.map(game.users, function(_user){
					return _user.id;
				}).indexOf(user.id);

				if(userIndex > -1){
					game.users.splice(userIndex, 1);
				}

				game.spotsTaken -= 1;

				game.save(function(err, result){
					//console.log(result);
					Game.republishGame(game.id);
				});

				return game;
			}
		});
	},
/**
 * Roll builds for all slots in the game
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
 rollBuilds : function(req, res){
 	var id = req.param('id')

 	var options = {
 		id: id
 	};

 	gameService.rollBuildsForGame(options)
 	.then(function(){
 		Game.republishGame(id);
 	})
 	.catch(function(err){
 		return res.serverError(err);
 	});

 },
/**
 * Draws a card - will roll a build and set the build as drawn.
 * url: 'put /api/game/:id/actions/draw'
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
 drawCard : function(req, res){

 	var id = req.param('id')
 	var spotId = req.param('spotId')

 	var options = {
 		id: id,
 		spotId: spotId
 	}

 	gameService.drawCard(options)
 	.then(function(){
 		Game.republishGame(id);
 	})
 	.catch(function(err){
 		return res.serverError(err);
 	});

 },

/**
 * Start the game - will set the game status to started.
 * url: 'put /api/game/:id/actions/start'
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
 startGame : function(req, res){

 	var id = req.param('id')

 	var options = {
 		id: id
 	}

 	gameService.startGame(options)
 	.then(function(){
 		Game.republishGame(id);
 	})
 	.catch(function(err){
 		return res.serverError(err);
 	});

 },

 rollBuild: function(req, res) {
 	var id = req.param('id')
 	var spotId = req.param('spotId')


 	Q.all([lolDataService.getGameData(), Game.getOne(id)])
 	.then(function(gameData, game){

 		options.items = gameData.items;
 		options.champions = gameData.champions;
 		options.summoners = gameData.summoners;
 		options.maps = gameData.maps;
 		options.game = game;

 		gameService.rollBuildForGame(options)
 		.then(function(){
 			Game.republishGame(id);
 		})
 	})
 	.catch(function(err){
 		return res.serverError(err);
 	});
 },

 acceptBuild: function(req, res){
 	var id = req.param('id')
 	var spotId = req.param('spotId')

 	var options = {
 		id: id,
 		spotId: spotId
 	}
 	gameService.acceptBuild(options)
 	.then(function(result){
 		Game.publishUpdate(id, result);
 	})
 	.catch(function(err){
 		return res.serverError(err);
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

