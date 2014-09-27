/**
* Game.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var request = require("request");

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
		console.log(game);
		Game.findOne(game.id).
		populate("spots").
		exec(function(err, currentGame){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof currentGame != 'undefined'){
				for (var i = 0; i < currentGame.numberOfSpots; i++) {
					Spot.create({}).exec(function(err, spot) {
						if (err) {
							return console.log(err);
						}
						else {
							currentGame.spots.add(spot);
							currentGame.save(function(err, result){
							});
						}
					});

				};

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
		var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/champion.json';
		var champions = [];
		


		Game.findOne(id)
		.populate('spots')
		.exec(function(err, game){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof game != 'undefined'){

				game.spots.forEach(function(spot){
					var randomIndex = Math.floor(Math.random()*(champions.length));
					spot.champion = champions[randomIndex].id;
					champions.splice(randomIndex, 1);
					spot.save(function(err, result){});
				})

				game.save(function(err, result){
					Game.publishUpdate(result.id, result)
				})

						// Spot.update({id: ids}, {champion: randomChapmions}, function(err, spot){
						// 	console.log(spot);
						// });							
		
		
	}
	
});	
		
	},
	rollItems : function() {
		var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/champion.json';
	}
};

