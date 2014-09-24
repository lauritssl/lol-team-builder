angular.module( 'ubteambuilder.gamelobby', [])
.config(["$stateProvider",function ($stateProvider){

	$stateProvider.state( 'game', {
		url: '/games/:id',
		views: {
			"main": {
				controller: 'GameLobbyCtrl',
				templateUrl: 'gameLobby/views/gamelobby.tpl.html',
				controllerAs: 'gameLobby',	
				resolve: {

				 game: ["GameModel", "$stateParams", function(GameModel, $stateParams){
					return GameModel.getOne($stateParams.id)
				}]
				}			
			}
		}
	});
}])
.controller( 'GameLobbyCtrl', GameLobbyCtrl);

GameLobbyCtrl.$inject = [ '$sails', 'lodash', 'config', 'titleService', 'GameModel', 'game', '$location'];

 function GameLobbyCtrl($sails, lodash, config, titleService, GameModel, game, $location) {
 	if(game.statusCode == 404){
 		$location.path('/home');
 	}
   	var vm = this;
	vm.game = game;
	console.log(game);
	titleService.setTitle('Game');
	vm.currentUser = config.currentUser;

	$sails.on('game', function (envelope) {

		console.log(envelope);
		switch(envelope.verb) {
			case 'created':
				vm.games.unshift(envelope.data);
				console.log(vm.games);
				break;
			case 'updated':
				console.log(envelope.data);
				vm.game = envelope.data;
				break;
			case 'destroyed':
				lodash.remove(vm.games, {id: envelope.id});
				break;
		}
	});

	vm.isUserInGame = function(game){
		if(typeof vm.currentUser == 'undefined') return true;
		var users = [];
		for(var user in game.users){
			users.push(game.users[user].username)
		}

		return lodash.contains(users, vm.currentUser.username);
	}
	vm.createGame = function(newGame) {
		console.log(newGame);
		newGame.user = config.currentUser.id;
		GameModel.create(newGame).then(function(model) {

			vm.newGame = {};
		});
	};

	vm.joinGame = function(game){
		GameModel.addUser(game.id, vm.currentUser.id).then(function(model){
		})
	},
	vm.leaveGame = function(game){
		GameModel.removeUser(game.id, vm.currentUser.id).then(function(model){
		})
	}
	vm.destroyGame = function(game) {
		// check here if this message belongs to the currentUser
		if (game.user.id == config.currentUser.id) {
			GameModel.delete(game).then(function(model) {
				// message has been deleted, and removed from vm.messages
			});
		}
	};
	vm.userOwnsGame = function (gameId){
		if(gameId == vm.currentUser.id)	return true
			return false;
	}
	GameModel.getAll(vm).then(function(models) {

		vm.games = models;
	});
};