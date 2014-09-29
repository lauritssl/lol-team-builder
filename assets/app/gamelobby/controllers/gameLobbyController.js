angular.module( 'ubteambuilder.gamelobby.controllers', [])
.controller( 'GameLobbyCtrl', GameLobbyCtrl);

GameLobbyCtrl.$inject = [ '$sails', 'lodash', 'Session', 'titleService', 'GameModel', 'game', '$location', '$rootScope', 'champions', 'items', 'summoners', 'ChampionService'];

 function GameLobbyCtrl($sails, lodash, Session, titleService, GameModel, game, $location, $rootScope, champions, items, summoners, ChampionService) {
 	if(game.statusCode == 404){
 		$location.path('/home');
 	}





 	//initialize variables
   	var vm = this;
	vm.game = game;
	vm.champions = champions;
	vm.summoners = summoners;
	vm.items = items;
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
		GameModel.addUserToSpot(game.id, vm.currentUser.id, spot.id).then(function(model){
		});
		
	},

	vm.removeUserFromSpot = function(gameId, userId, spotId){
		GameModel.removeUserFromSpot(gameId, userId, spotId).then(function(model){
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
	vm.userOwnsGame = function (){
		if(vm.game.user.id == vm.currentUser.id)	return true
			return false;
	}

	vm.getUserFromGame = function(game, userId){
		var gameUser = {};
		angular.forEach(game.users, function(user, key){
			if(user.id == userId){
				gameUser = user;
			}
		});
		return gameUser;
	}

	vm.getBuildFromGame = function(game, buildId){
		var gameBuild = {};
		angular.forEach(game.builds, function(build, key){
			if(build.id == buildId){
				gameBuild = build;
			}
		});
		return gameBuild;
	}

	vm.rollBuilds = function(game) {
		console.log("I don't get called");
		GameModel.rollBuilds(game.id).then(function(model) {
				// message has been deleted, and removed from vm.messages
			});;
	}

	vm.getChampionImage = function(championImageId){
		return ChampionService.getChampionImage(championImageId);
	}

	vm.getItemImageFromBuild = function(build, type){
		var build = vm.getBuildFromGame(vm.game, build);

		return ChampionService.getItemImage(vm.items[build[type]].image.full);
	}

	vm.getSummonerImageFromBuild = function(build, type){
		var build = vm.getBuildFromGame(vm.game, build);

		return ChampionService.getSummonerImage(vm.summoners[build[type]].image.full);
	}

	vm.getItemFromBuild = function(build, type) {
		var build = vm.getBuildFromGame(vm.game, build);

		return vm.items[build[type]];
	}

	vm.isUserInSpot = function(slot){
		if(typeof slot.user == 'undefined' || slot.user == null) return false;
		return true;
	}

	vm.rerollSpot = function(id, spotId){
		if (vm.game.user.id == Session.currentUser.id) {
			GameModel.rollBuild(id, spotId).then(function(model) {
				// message has been deleted, and removed from vm.messages
			});
		}
	}

	vm.init();
	
};