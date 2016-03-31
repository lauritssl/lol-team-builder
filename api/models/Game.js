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
			required: true
		},
		users: {
			type : "array"
		},
		user: {
			type: "json",
			required: true
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
			type : "array"
		},
		map: {
			type: 'integer',
			defaultsTo: 11
		},
		gameMode: {
			type: 'string',
			defaultsTo: 'normal'
		},
		password: {
			type: 'string'
		},
		private: {
			type: 'boolean',
			defaultsTo: false
		},
		toJSON: function() {
		    var obj = this.toObject();
		    // BELOW NOT WORKING
		    delete obj.password;
		    return obj;
	  	}
	},

	getAll: function(_options) {

		var sort;
		if(_options.sort){
			sort = _option.sort || 'createdAt';
			var order = _options.ascending ? 'ASC' : 'DESC';
			sort = sort + ' ' + order;
			console.log(sort);
		}
		filter = {
			limit: _options.limit || 10,
			skip: _options.skip || 0,
			sort: sort || 'createdAt DESC'
		};

		if(typeof _options.name !== 'undefined' && !_.isEmpty(_options.name)) {
			filter.where = {
				title: {contains: _options.name}
			};
		}

		filter.where = filter.where || {};
		filter.where.private = {"!": true};

		return Game.find(filter)
		.then(function (models) {
			return [models];
		});
	},

	getOne: function(id) {
		return Game.findOne(id)
		.then(function (model) {
			return [model];
		});
	},

	destroyUser: function(id, userId){
		Game
		.findOne(id)
		.exec(function(err, game){
			if (err) {
				return res.serverError(err);
			}
			else if(typeof game != 'undefined'){
				game.users.remove(userId);
				game.save(function(err){});
				return game;
			}
		});
	},

	removeUserFromAllSpots: function(id, userId){
		return Game.findOne(id)
		.then(function (game) {
			for(var key in game.spots){
				if(game.spots[key].user == userId){
					Spot.removeUser(key);
				}
			}
			return game;
		});
	},



	republishGame : function(id){
		var game = Game.findOne(id);
		game.then(function(result){
			console.log(id + ', ' + result);
			Game.publishUpdate(id, result);
		});
	}
};
