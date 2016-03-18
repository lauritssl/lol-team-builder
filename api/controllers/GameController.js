/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 var async = require('async');


 module.exports = {
 	getAll: function(req, res) {

 		var filter = {
 			limit : req.param('limit'),
 			skip : req.param('skip'),
 			name: req.param('name'),
 			sort: req.param('sort'),
 			ascending: req.param('ascending')
 		}
 		Game.getAll(filter)
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
 			if(model === null){
 				return res.send(404);
 			}
 			Game.subscribe(req.socket, model);
 			return res.json(model);
 		})
 		.fail(function(err) {
 			return res.send(404);
 		});
 	},


 	create: function (req,res) {

 		var user = {
 			id: utilsService.generateGUID(),
 		    nickname: req.param('user').nickname
 		};

 		var options = {
 			title : req.param('title'),
 			user : user,
 			numberOfSpots : req.param('numberOfSpots'),
 			password: req.param('password') || '',
 			map : req.param('map'),
 			private : req.param('private'),
 			gameMode: req.param('gameMode')
 		};


 		gameService.create(options)
 		.then(function(result){
 			Game.publishCreate(result);
 			return res.json(result);
 		});

 	},


	destroy: function(req, res){

		var id = req.param('id');

		gameService.destroy(id)
		.then(function(result){
			Game.publishDestroy(result.id);
			return res.json(result)
		})
		.catch(function(err){
			return res.serverError(err);
		})

	},
	// destroy: function (req, res) {
	// 	var id = req.param('id');
	// 	if (!id) {
	// 		return res.badRequest('No id provided.');
	// 	}



	// 	// Otherwise, find and destroy the model in question
	// 	Game.findOne(id).exec(function(err, model) {
	// 		if (err) {
	// 			return res.serverError(err);
	// 		}
	// 		if (!model) {
	// 			return res.notFound();
	// 		}

	// 		Game.destroy(id, function(err) {
	// 			if (err) {
	// 				return res.serverError(err);
	// 			}


	// 			Game.publishDestroy(model.id);
	// 			return res.json(model);
	// 		});
	// 	});
	// },π
	addUser: function (req, res) {
		var user = req.param('user');
		var password = req.param('password');
		var id = req.param('id');

		var options = {
			user: user,
			id : id,
			password: password
		}

		userService.addUser(options)
		.then(function(result){
			Game.publishUpdate(id, result);
			return res.json(user);
		})
		.catch(function(err){
			if(err.message === 'password'){
				res.status(401);
				return res.send('The provide password was invalid');
			}
			return res.serverError(err);
		})
	},
	addSpot: function  (req,res) {
		var user = req.param('user');
		var id = req.param('id');

		var options = {
			id : id,
		}

		spotService.addSpot(options)
		.then(function(result){
			Game.publishUpdate(id, result);
			return res.json(result);
		})
		.catch(function(err){
			return res.serverError(err);
		})

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
			return res.json(result);
		})
		.catch(function(err){
			if(err.name === 'notAllowed'){return;}
			return res.serverError(err);
		})

	},
	removeUserFromSpot: function(req, res) {
		var userId = req.param('userId');
		var id = req.param('id');
		var spotId = req.param('spotId');


		var options = {
			userId: userId,
			id : id,
			spotId : spotId
		}

		spotService.removeUserFromSpot(options)
		.then(function(result){
			Game.publishUpdate(id, result);
			return res.json(result);
		})
		.catch(function(err){
			return res.serverError(err);
		})

	},
	destroyUser: function (req, res) {
		var userId = req.param('userId');
		var id = req.param('id');

		var options = {
			userId: userId,
			id : id,
		}

		userService.deleteUser(options)
		.then(function(result){
			Game.publishUpdate(id, result);
			return res.json(result);
		})
		.catch(function(err){
			return res.serverError(err);
		})

	},
	destroySpot: function(req, res) {
		var spotId = req.param('spotId');
		var id = req.param('id');

		var options = {
			spotId: spotId,
			id : id,
		}

		spotService.deleteSpot(options)
		.then(function(result){
			Game.publishUpdate(id, result);
			return res.json(result);
		})
		.catch(function(err){
			return res.serverError(err);
		})
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
 	.then(function(result){
 		Game.republishGame(id);
 		return res.json(result);
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
 	.then(function(result){
 		Game.publishUpdate(id, result);
 		return res.json(result);
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
 	.then(function(result){
 		Game.publishUpdate(id, result);
 		return res.json(result);

 	})
 	.catch(function(err){
 		return res.serverError(err);
 	});

 },

 endGame : function(req, res){

 	var id = req.param('id')

 	var options = {
 		id: id
 	}

 	gameService.endGame(options)
 	.then(function(result){
 		Game.publishUpdate(id, result);
 		return res.json(result);
 	})
 	.catch(function(err){
 		return res.serverError(err);
 	});

 },


 rollBuild: function(req, res) {
 	var id = req.param('id')
 	var spotId = req.param('spotId')

 	var options = {
 		id: id,
 		spotId: spotId
 	}

 	gameService.rerollBuild(options)
 	.then(function(result){
 		Game.publishUpdate(id, result);
 		return res.json(result);
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
 		return res.json(result);
 	})
 	.catch(function(err){
 		return res.serverError(err);
 	});
 },

 denyBuild: function(req, res){
 	var id = req.param('id')
 	var spotId = req.param('spotId')

 	var options = {
 		id: id,
 		spotId: spotId
 	}
 	gameService.denyBuild(options)
 	.then(function(result){
 		Game.publishUpdate(id, result);
 		return res.json(result);
 	})
 	.catch(function(err){
 		return res.serverError(err);
 	});
 }
};
