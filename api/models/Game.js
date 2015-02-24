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
			type : "array"
		},
		user: {
			model: 'user'
		},
		numberOfSpots: {
			type: 'integer',
			defaultsTo: 10
		},
		spotsTaken: {
			type: 'integer',
			defaultsTo: 0
		},
		gameStarted: {
			type: 'boolean',
			defaultsTo: false
		},
		spots: {
			type : "json"
		},
		map: {
			type: 'integer',
			defaultsTo: 11
		},
		builds: {
			collection: 'build',
			via: 'id'
		},
		private: {
			type: 'boolean',
			defaultsTo: false
		}
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
	rollBuild : function(id, spotId, items, champions, summoners, maps){


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


					lolService.rollBuild(game.map || 1,spot, items, summoners, newChampions, maps, function(result){
						async.parallel([
							function(callback){
								Spot.update({id: spot.id}, {champion: result.champion}, function(err, result){
									if(err) {
										console.log(err);
										callback(err);
									}else{

									callback();
									}
								})
							},
							function(callback){
								Build.update({id: build.id},
									{boots: result.boots.boots,
									bootsEnchantment: result.boots.bootsEnchantment,
									item1: result.items.item1,
									item2: result.items.item2,
									item3: result.items.item3,
									item4: result.items.item4,
									item5: result.items.item5,
									jungleItemEnchantment: result.items.jungleItemEnchantment,
									mastery1: result.masteries.mastery1,
									mastery2: result.masteries.mastery2,
									mastery3: result.masteries.mastery3,
									summoner1: result.summoners.summoner1,
									summoner2: result.summoners.summoner2,
									skill_to_level: result.skill_to_level}, function(err, result){
										if(err) {
											console.log(err);
											callback(err);
										}
										else{
											callback();
										}
									})
								// build.save(function(err){
								// 	if(err) callback(err)
								// 		callback();

								// });
							},

							], function(err){
								if(err) callback(err)
								else {Game.republishGame(game.id); }
							})

					});

	});					// Spot.update({id: ids}, {champion: randomChapmions}, function(err, spot){
						// 	console.log(spot);
						// });
}

});

},
rollBuilds : function(id, items, champions, summoners, maps) {

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
						console.log(err);
						callback(err);
						return;
					}
					else if(typeof build == 'undefined'){
						err = "build was not found";
						console.log(err);
						callback(err);
						return;

					}else{
						lolService.rollBuild(game.map || 1, spot, items, summoners, newChampions, maps, function(result){
							newChampions.splice(result.randomIndex, 1);
							async.parallel([
								function(callback){
									Spot.update({id: spot.id}, {champion: result.champion}, function(err, result){
										if(err) {
											console.log(err);
											callback(err);
										}else{

										callback();
										}
									})
									// spot.save(function(err, result){
									// 	if(err) callback(err);
									// 	callback();
									// });
								},
								function(callback){
									Build.update({id: build.id},
										{boots: result.boots.boots,
										bootsEnchantment: result.boots.bootsEnchantment,
										item1: result.items.item1,
										item2: result.items.item2,
										item3: result.items.item3,
										item4: result.items.item4,
										item5: result.items.item5,
										jungleItemEnchantment: result.items.jungleItemEnchantment,
										mastery1: result.masteries.mastery1,
										mastery2: result.masteries.mastery2,
										mastery3: result.masteries.mastery3,
										summoner1: result.summoners.summoner1,
										summoner2: result.summoners.summoner2,
										skill_to_level: result.skill_to_level}, function(err, result){
											if(err) {
												console.log(err);
												callback(err);
											}
											else{
												callback();
											}
										})
									// build.save(function(err){
									// 	if(err) callback(err)
									// 		callback();

									// });
								},

								], function(err){
									if(err) {
										console.log(err);
										 callback(err)
										}
										else{
											callback();
										}
								})



						});
					}

				}, function(err){
					if(err){
						console.log(err)
					}
					else if(!game.gameStarted){
						Game.update({id:game.id},{gameStarted: true},function(err, result){
							if(err){
									console.log(err);
							}else{
							game.gameStarted = true;
							Game.republishGame(game.id);
							}
						})
					}else{
						Game.republishGame(game.id);
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

