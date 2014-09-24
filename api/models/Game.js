/**
* Game.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

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
		spots: {
			type: 'number',
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
	}
};

