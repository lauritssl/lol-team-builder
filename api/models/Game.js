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
		Game.getOne(game.id)
		.spread(function(currentGame){
			async.parallel([
				function(callback){
					User.getOne(game.user)
					.spread(function(user) {
						currentGame.user = user;			

						callback();
					});
				},
				function(callback){
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
							callback();
						})
				}], function(err){
					currentGame.save(function(err, result){					
						next(null, result);
					})
				});	
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
	rollBuild : function(id, spotId, items, champions, summoners){


		Game.findOne(id)
		.populate('spots')
		.populate('builds')
		.exec(function(err, game){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof game != 'undefined'){

				var existingChampions = [];
				var newChampions = Object.keys(champions.data).map(function(k) { 
					return champions.data[k]});


				async.forEach(game.spots, function(spot, callback){
					if(typeof spot.champion != 'undefined'){							
						existingChampions.push(spot.champion)
					}
					callback();
				}, function(err){



					newChampions = newChampions.filter(function(champion){return existingChampions.indexOf(champion.id) < 0});

					//TODO: Could lead to an index out of bounds exception
					var spot = game.spots.filter(function(spot){return spot.id == spotId})[0];
					var build = game.builds.filter(function(build){return build.id = spot.build})[0];

					if(typeof spot == 'undefined'){
						err = "spot was not found";
						return;
					}
					if(typeof build == 'undefined'){
						err = "build was not found";
						return;

					}

					spot.champion = newChampions[Math.floor(Math.random()*(newChampions.length))].id;

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
									Game.republishGame(game.id);
							})

					});		

	});					// Spot.update({id: ids}, {champion: randomChapmions}, function(err, spot){
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

					var build = game.builds.filter(function(build){ 
						return build.id == spot.build})[0];
					if(typeof spot == 'undefined'){
						err = "spot was not found";
						callback(err);
						return;
					}
					if(typeof build == 'undefined'){
						err = "build was not found";
						callback(err);
						return;

					}


					var randomIndex = Math.floor(Math.random()*(newChampions.length));
					spot.champion = newChampions[randomIndex].id;
					newChampions.splice(randomIndex, 1);


					
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
					if(err){ console.log(err)}
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

