angular.module( 'ubteambuilder.gamelobby.controllers', ['pmkr.components'])
.controller( 'GameLobbyCtrl', GameLobbyCtrl);

GameLobbyCtrl.$inject = [ '$sails', 'lodash', 'Session', 'titleService', 'GameModel', 'game', '$location', '$rootScope', 'champions', 'items', 'summoners', 'ChampionService', '$cookieStore', '$state', 'ngAudio'];

 function GameLobbyCtrl($sails, lodash, Session, titleService, GameModel, game, $location, $rootScope, champions, items, summoners, ChampionService, $cookieStore, $state, ngAudio) {

 	if(game.statusCode === 404){
 		return $state.go('home');
 	}
 	//initialize variables
  var vm = this;

  vm.startSound = ngAudio.load("http://www.myinstants.com/media/sounds/leroy.swf.mp3");

  //Set the user - or go to join game if the user is not in the lobby
 	vm.currentUser =  $cookieStore.get(game.id);


	if( vm.currentUser === undefined || vm.currentUser.id === undefined){
		$state.go('game.join', {id: game.id});
		return;
	}

	vm.game = game;
	vm.champions = champions;
	vm.summoners = summoners;
	vm.items = items;
	vm.expandedSpots = {};

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
		if(!spot.user){		
		GameModel.addUserToSpot(game.id, vm.currentUser.id, spot.id).then(function(model){
		
		});
		}
	};

	vm.removeUserFromSpot = function(gameId, spot){
		GameModel.removeUserFromSpot(gameId, spot.user, spot.id).then(function(model){
		});
	};

	vm.leaveGame = function(game){
		GameModel.removeUser(game.id, vm.currentUser).then(function(model){});
	};

	vm.userHasTurn = function(game){
		var nextRollableSpot = vm.getNextRollableSpot(game);
		if(nextRollableSpot.user === vm.currentUser.id) return true;
		return false;
	}

	vm.getNextRollableSpot = function(game){
		var spot = _.find(game.spots, function(spot){
			if(typeof spot.build !== 'undefined') return spot.build.drawn !== true || spot.build.drawn && !spot.build.accepted ;
			else return typeof spot.build === 'undefined'
			});
		return spot;
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
		if(vm.game.user.id === vm.currentUser.id) return true;
			return false;
	};

	

	vm.rollBuilds = function(game) {
		console.log("I don't get called");
		GameModel.rollBuilds(game.id).then(function(model) {
				// message has been deleted, and removed from vm.messages
			});
	};

	vm.getChampionImage = function(championImageId){
		return ChampionService.getChampionImage(championImageId);
	};

	vm.getItemImageFromBuild = function(build, type){

		return ChampionService.getItemImage(build[type]);
	};

	vm.getSummonerImageFromBuild = function(build, type){

		return ChampionService.getSummonerImage(vm.summoners[build[type]].image.full);
	};

	vm.getChampionSkillImageFromBuild = function(build, champion){
		var spell = vm.getSkillFromChampion(build, champion);

		return ChampionService.getAbilityImage(champion, spell.image.full);
	};

	vm.getItemFromBuild = function(build, type) {
		var item = angular.copy(vm.items[build[type]]);
		if(item.group === "JungleItems") {
			item = angular.copy(vm.items[build.jungleItemEnchantment]);
			var name = vm.items[build[type]].name + " with " + item.name;
			item.name = name;
		}else if(type === "boots"){
			item = angular.copy(vm.items[build.bootsEnchantment]);
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

	/**
	 * Checks whether a user is in the specified spot
	 * @param  spot {Object}
	 * @return {Boolean}
	 */
	vm.isUserInSpot = function(spot){
		if(typeof spot.user == 'undefined' || spot.user == null) return false;
		return true;
	};
	/**
	 * Checks whether the user is in any spots of the game
	 * @param  userId {number}
	 * @param  game {Object}
	 * @return {Boolean}
	 */
	vm.userInSpot = function(userId, game) {
		return _.some(game.spots, function(spot){return spot.user === userId});
	}
	/**
	 * Get the specified user from the game object
	 * @param  userId{Number}
	 * @param  game{Object}
	 * @return user{Object}
	 */
	vm.getUserFromGame = function(userId, game){
		var user = _.find(game.users, function(user){return user.id == userId});
		return user;
	}


	vm.rerollSpot = function(game, spot){
		if (vm.game.user.id == vm.currentUser.id) {
			GameModel.rollBuild(game.id, spot.id).then(function(model) {
				
			});
		}
	}
	vm.drawCard = function(id, spot) {
		
		if(spot.user === vm.currentUser.id){

		GameModel.drawCard(id, spot.id).then(function(model) {
				
			});
		}
	};

	vm.startGame = function(id) {
		// if (spot.user.id == vm.currentUser.id) {
			
		// }
		ngAudio.play("http://www.myinstants.com/media/sounds/leroy.swf.mp3");
		GameModel.startGame(id).then(function(model) {
				
			});
	};

	vm.endGame = function(id) {
		// if (spot.user.id == vm.currentUser.id) {
			
		// }
		GameModel.endGame(id).then(function(model) {
				vm.expandedSpots = {};
			});
	};

	vm.getChampionBackground = function(championImageId) {
			return ChampionService.getChampionBackground(championImageId);
	}

	vm.resetBuilds = function(gameId) {
		GameModel.resetBuilds(gameId).then(function(result){});
	};

	vm.getColWidth = function(game) {
		var colWidth = "col-lg-" +Math.floor(12/(game.numberOfSpots/2));

		if(colWidth == "col-lg-2") colWidth = "player_shield_regulator";
		return colWidth;
	};

	vm.toggleSpot = function(spot){
		vm.expandedSpots[spot.id] = vm.expandedSpots[spot.id] ? false : true;
	}
	

	vm.denied = function(game, spot) {
		GameModel.denied(game.id, spot.id)
		.then(function(result){

		});
	};

	vm.acceptBuild = function(game, spot) {
		GameModel.acceptBuild(game.id, spot.id)
		.then(function(result){
			if(vm.userHasTurn(vm.game)) ngAudio.play('http://soundbible.com/mp3/Air%20Horn-SoundBible.com-964603082.mp3');

		});
	};

	vm.allSpotsAccepted = function(game){
		var allAccepted = !_.some(game.spots, function(spot){
							if(typeof spot.build === 'undefined') return true;
							return spot.build.accepted === false;
						  });
		return allAccepted;
	}

	vm.isBuildAccepted = function(spot){
		if(typeof spot.build === 'undefined') return false
		return spot.build.accepted
	}



	vm.init();

};