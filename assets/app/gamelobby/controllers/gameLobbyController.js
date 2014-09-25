angular.module( 'ubteambuilder.gamelobby', [])
.config(["$stateProvider",function ($stateProvider){

	$stateProvider.state( 'game', {
		url: '/games/:id',
		views: {
			"main": {
				controller: 'GameLobbyCtrl',
				templateUrl: 'gamelobby/views/gamelobby.tpl.html',
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

GameLobbyCtrl.$inject = [ '$sails', 'lodash', 'Session', 'titleService', 'GameModel', 'game', '$location', '$rootScope'];

 function GameLobbyCtrl($sails, lodash, Session, titleService, GameModel, game, $location, $rootScope) {
 	if(game.statusCode == 404){
 		$location.path('/home');
 	}


 	//initialize variables
   	var vm = this;
	vm.game = game;
	console.log(game);
	titleService.setTitle('Game');
	vm.currentUser = Session.currentUser;

	//Initialization function
	vm.init = function(){
		vm.joinGame(vm.game);

	}

	//add listeners
	$rootScope.$on("$locationChangeStart", function (event, current) {
		vm.leaveGame(vm.game);
    });

	$sails.on('game', function (envelope) {
		switch(envelope.verb) {
			case 'created':
				vm.games.unshift(envelope.data);
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

	//functions
	vm.isUserInGame = function(game){
		if(typeof vm.currentUser == 'undefined') return true;
		var users = [];
		for(var user in game.users){
			users.push(game.users[user].username)
		}

		return lodash.contains(users, vm.currentUser.username);
	}
	vm.createGame = function(newGame) {
		newGame.user = Session.currentUser.id;
		GameModel.create(newGame).then(function(model) {

			vm.newGame = {};
		});
	};

	vm.joinGame = function(game){
		GameModel.addUser(vm.game.id, vm.currentUser.id).then(function(model){
		});
		
	},

	vm.joinSpot = function(game, spot){
		GameModel.addUserToSpot(vm.game.id, vm.currentUser.id, spot.id).then(function(model){
		});
		
	},
	vm.leaveGame = function(game){
		GameModel.removeUser(game.id, vm.currentUser.id).then(function(model){
		})
	}
	vm.destroyGame = function(game) {
		// check here if this message belongs to the currentUser
		if (game.user.id == Session.currentUser.id) {
			GameModel.delete(game).then(function(model) {
				// message has been deleted, and removed from vm.messages
			});
		}
	};
	vm.userOwnsGame = function (gameId){
		if(gameId == vm.currentUser.id)	return true
			return false;
	}

	vm.getUserFromGame = function(game, userId){
		var gameUser = {};
		angular.forEach(game.users, function(user, key){
			if(user.id == userId){
				gameUser = user;
			}
		});

			console.log(gameUser);
		return gameUser;
	}

	vm.init();
	
};