/**
* Game.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var request = require("request");
var async = require("async");

module.exports = {

	attributes: {
		title: {
			type: 'string',
			required: true,
			unique: true
		},
		users: {
			collection: 'user',
			via: 'username',
			dominant: true
		},
		user: {
			model: 'user'
		},
		numberOfSpots: {
			type: 'integer',
			defaultsTo: 10
		},
		gameStarted: {
			type: 'boolean',
			defaultsTo: false
		},
		spots: {
			collection: 'spot',
			via: 'id',
		},
		builds: {
			collection: 'build',
			via: 'id'
		}
	},
	afterCreate: function (game, next) {
		// set message.user = to appropriate user model
		User.getOne(game.user)
		.spread(function(user) {
			game.user = user;			
			next(null, game);
		});
		Game.findOne(game.id)
		.populate("spots")
		.populate("builds")
		.exec(function(err, currentGame){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof currentGame != 'undefined'){
				var count = 0;
				async.whilst(
					function() {return count < currentGame.numberOfSpots},
					function(callback){
						Spot.create({}).exec(function(err, spot) {
							if (err) {
								return console.log(err);
							}
							else {

								currentGame.spots.add(spot);
								Build.create({}).exec(function(err, build){

									currentGame.builds.add(build);
									spot.build = build;
									spot.save(function(err, result){
										count++;
										callback();
									});

								})

							}
						});

					},
					function(err){
						currentGame.save(function(err, gameResult){
							Game.publishUpdate(gameResult.id, gameResult);
						});
					})

				
			}


		});

	},
	getAll: function() {
		return Game.find()
		.populate('user')
		.then(function (models) {
			return [models];
		});
	},
	getOne: function(id) {
		return Game.findOne(id)
		.populate('user')
		.populate('builds')
		.populate('users')
		.populate('spots')
		.then(function (model) {
			return [model];
		});
	},
	destroyUser: function(id, userId){

		Game.findOne(id).
		exec(function(err, game){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof game != 'undefined'){
				game.users.remove(userId)
				game.save(function(err){});
				return game;
			}


		})
	},
	removeUserFromAllSpots: function(id, userId){
		return Game.findOne(id)
		.populate('spots')
		.then(function (game) {
			for(var key in game.spots){
				if(game.spots[key].user == userId){
					Spot.removeUser(key);
				}
			}
			return game;
		});
	},
	rollChampions : function(id, champions){
		


		Game.findOne(id)
		.populate('spots')
		.exec(function(err, game){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof game != 'undefined'){
				var timesThroughSpots = 0;
				game.spots.forEach(function(spot){
					var randomIndex = Math.floor(Math.random()*(champions.length));
					spot.champion = champions[randomIndex].id;
					champions.splice(randomIndex, 1);
					spot.save(function(err, result){
						timesThroughSpots++;
						if(timesThroughSpots == game.spots.length){

							Game.republishGame(id);
						}
					});
				});

						// Spot.update({id: ids}, {champion: randomChapmions}, function(err, spot){
						// 	console.log(spot);
						// });	
	}

});
		
	},
	rollBuilds : function(id, items, champions, summoners) {
		
		Game.findOne(id)
		.populate('spots')
		.populate('builds')
		.exec(function(err, game) {
			if (err) {
				//return res.serverError(err);
			}
			else if(typeof game != 'undefined'){
				var timesThroughSpots = 0;
				var newChampions = Object.keys(champions.data).map(function(k) { 
					return champions.data[k]
				});
				async.forEach(game.spots, function(spot, callback){
					var randomIndex = Math.floor(Math.random()*(newChampions.length));
					spot.champion = newChampions[randomIndex].id;
					newChampions.splice(randomIndex, 1);

					var build = game.builds.filter(function(build){ 
						return build.id == spot.build})[0];

					lolService.rollBuild(build, spot, items, summoners, function(){
						async.parallel([
							function(callback){
								spot.save(function(err, result){
									if(err) callback(err);
									callback();
								});
							},
							function(callback){
								build.save(function(err){
									if(err) callback(err)
										callback();

								});
							},

							], function(err){
								if(err) callback(err)
									callback();
							})
						

						
					});
				}, function(err){
					if(err){}
						else{
							game.gameStarted = true;
							game.save(function(err, result){
								if(err){
										//return res.serverError(err);
									}else{										
										Game.publishUpdate(result.id, result);
									}
								})
						}


					})
}
})
},


republishGame : function(id){
	var game = this.getOne(id);
	game.spread(function(result){
		Game.publishUpdate(id, result)
	});
}
};

