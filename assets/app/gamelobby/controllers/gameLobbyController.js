angular.module( 'ubteambuilder.gamelobby.controllers', ['pmkr.components'])
.controller( 'GameLobbyCtrl', GameLobbyCtrl);

GameLobbyCtrl.$inject = [ '$sails', 'lodash', 'Session', 'titleService', 'GameModel', 'game', '$location', '$rootScope', 'champions', 'items', 'summoners', 'ChampionService', '$cookieStore', '$state'];

 function GameLobbyCtrl($sails, lodash, Session, titleService, GameModel, game, $location, $rootScope, champions, items, summoners, ChampionService, $cookieStore, $state) {

 	if(game.statusCode === 404){
 		return $state.go('home');
 	}
 	//initialize variables
  var vm = this;

  //Set the user - or go to join game if the user is not in the lobby
 	vm.currentUser =  $cookieStore.get(game.id);


	if( vm.currentUser === undefined || vm.currentUser.id === undefined){
		$state.go('game.join', {id: game.id});
		return;
	}

	vm.game = game;

	vm.game.gameStarted = true;
	vm.champions = champions;
	vm.summoners = summoners;
	vm.items = items;

	titleService.setTitle('Game');

	//Initialization function
	vm.init = function(){
		vm.joinGame(vm.game);
	}

	//add listeners
	$rootScope.$on("$locationChangeStart", function (event, current) {
		//vm.leaveGame(vm.game);
  });

	$sails.on('game', function (envelope) {
		switch(envelope.verb) {
			case 'created':
				vm.games.unshift(envelope.data);
				break;
			case 'updated':
				//console.log(envelope.data);
				vm.game = envelope.data;
				vm.game.gameStarted = true;
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
	};

	vm.createGame = function(newGame) {
		newGame.user = vm.currentUser.id;
		GameModel.create(newGame).then(function(model) {
			vm.newGame = {};
		});
	};

	vm.joinGame = function(game){
		GameModel.addUser(vm.game.id, vm.currentUser).then(function(model){});
	};

	vm.joinSpot = function(game, spot){
		GameModel.addUserToSpot(game.id, vm.currentUser.id, spot.id).then(function(model){
		});
	};

	vm.removeUserFromSpot = function(gameId, userId, spotId){
		GameModel.removeUserFromSpot(gameId, userId, spotId).then(function(model){
		});
	};

	vm.leaveGame = function(game){
		GameModel.removeUser(game.id, vm.currentUser).then(function(model){});
	};

	vm.destroyGame = function(game) {
		// check here if this message belongs to the currentUser
		if (game.user.id == Session.currentUser.id) {
			GameModel.delete(game).then(function(model) {
				// message has been deleted, and removed from vm.messages
			});
		}
	};

	vm.userOwnsGame = function (){
		if(vm.game.user.id === vm.currentUser.id) return true;
			return false;
	};

	vm.getUserFromGame = function(game, userId){
		var gameUser = {};
		angular.forEach(game.users, function(user, key){
			if(user.id == userId){
				gameUser = user;
			}
		});
		return gameUser;
	};

	vm.rollBuilds = function(game) {
		console.log("I don't get called");
		GameModel.rollBuilds(game.id).then(function(model) {
			vm.game.gameStarted = true;
				// message has been deleted, and removed from vm.messages
			});
	};

	vm.getChampionImage = function(championImageId){
		return ChampionService.getChampionImage(championImageId);
	};

	vm.getItemImageFromBuild = function(build, type){

		return ChampionService.getItemImage(vm.items[build[type]].image.full);
	};

	vm.getSummonerImageFromBuild = function(build, type){
		var build = vm.getBuildFromGame(vm.game, build);

		return ChampionService.getSummonerImage(vm.summoners[build[type]].image.full);
	};

	vm.getChampionSkillImageFromBuild = function(build, champion){
		var spell = vm.getSkillFromChampion(build, champion);

		return ChampionService.getAbilityImage(champion, spell.image.full);
	};

	vm.getItemFromBuild = function(build, type) {
		var build = vm.getBuildFromGame(vm.game, build);
		var item = angular.copy(vm.items[build[type]]);
		if(item.group === "JungleItems") {
			item = angular.copy(vm.items[build.jungleItemEnchantment]);
			var name = vm.items[build[type]].name + " with " + item.name;
			item.name = name;
		}
		return item;
	};

	vm.getSkillFromChampion = function(build) {
		var index = 0;
		switch(build.skill_to_level){
			case "Q":
			index = 0;
			 break;
			 case "W":
			index = 1;
			 break;
			 case "E":
			index = 2;
			 break;
			 default:
			 	index = 0;
		}

		return vm.champions[build.champion].spells[index];
	};

	vm.isUserInSpot = function(spot){
		if(typeof spot.user == 'undefined' || spot.user == null) return false;
		return true;
	};

	vm.rerollSpot = function(id, spotId){
		if (vm.game.user.id == Session.currentUser.id) {
			GameModel.rollBuild(id, spotId).then(function(model) {
				// message has been deleted, and removed from vm.messages
			});
		}
	}

	vm.getChampionBackground = function(spot) {
		return "{'background': 'url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+spot.build.champion+"_0.jpg) no-repeat center center', 'background-size': 'cover'}"
	}

	vm.resetBuilds = function(gameId) {
		GameModel.resetBuilds(gameId).then(function(result){});
	};

	vm.getColWidth = function(game) {
		var colWidth = "col-lg-" +Math.floor(12/(game.numberOfSpots/2));

		if(colWidth == "col-lg-2") colWidth = "player_shield_regulator";
		return colWidth;
	};

	vm.init();

};