/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
		});
 	},

 	getOne: function(req, res) {
 		Game.getOne(req.param('id'))
 		.spread(function(model) {

 			if(model == null){
 				res.send(404);
 			};
 			console.log("Updated!");
 			Game.subscribe(req.socket, model);
 			res.json(model);
 		})
 		.fail(function(err) {
 			res.send(404);
 		});
 	},

 	create: function (req, res) {
 		var userId = req.param('user');
 		var model = {
 			title: req.param('title'),
 			user: userId
 		};

 		Game.create(model)
 		.exec(function(err, game) {
 			if (err) {
 				return console.log(err);
 			}
 			else {
 				Game.publishCreate(game);
 				res.json(game);
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

				Game.publishDestroy(model.id);
				return res.json(model);
			});
		});
	},
	addUser: function (req, res) {
		var userId = req.param('user');
		var id = req.param('id');
		Game.findOne(id).
		populate("users").
		exec(function(err, game){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof game != 'undefined'){
				game.users.add(userId)
				game.save(function(err, result){
					if(err){
						res.json(err);
					}else{
						Game.publishUpdate(game.id,result);
						res.json(result);
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

				Spot.update({user: userId}, {user: null}, function(err, model){});
			
				Spot.findOne(spotId).exec(function(err,spot){
					if (err) {
						return res.serverError(err);
					}
					else if(spot != 'undefined'){
						User.getOne(userId).spread(function(user){
						console.log(spot.user);
						if(typeof spot.user == 'undefined' ||spot.user == null ||spot.user == -1){
							spot.user = user;
						spot.save(function(err, result){
							game.save(function(err, result){
								Game.publishUpdate(game.id,result);
								res.json(result);
							});
						})
					}else{
						return res.serverError("spot already taken");
					}
						
						})
						
					}
				});
				

			}


		});

	},
	destroyUser: function (req, res) {
		var userId = req.param('user');
		var id = req.param('id');
		console.log("started deleting user");
		Game.findOne(id).
		exec(function(err, game){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof game != 'undefined'){
				Spot.update({user: userId}, {user: null}, function(err, model){
					game.users.remove(userId)
				game.save(function(err, result){
					console.log(result);
					Game.publishUpdate(result.id,result);
					res.json(game);
				});
				return game;
				});
				
			}


		});
	},

	rollBuilds : function(req, res){
		var id = req.param('id');
		lolService.getChampions(id, Game.rollChampions);
	}
};

