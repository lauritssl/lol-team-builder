angular.module( 'ubteambuilder.gamelobby.controllers', ['pmkr.components'])
.controller( 'GameLobbyCtrl', GameLobbyCtrl);

GameLobbyCtrl.$inject = [ '$sails', 'lodash', 'titleService', 'GameModel', 'game', '$location', '$rootScope', 'champions', 'items', 'summoners', 'ChampionService', '$cookieStore', '$state', 'ngAudio', 'NotificationService', 'GameLobbyService', '$log'];

 function GameLobbyCtrl($sails, lodash, titleService, GameModel, game, $location, $rootScope, champions, items, summoners, ChampionService, $cookieStore, $state, ngAudio,NotificationService, GameLobbyService, $log) {

 	if(game.statusCode === 404){
 		return $state.go('home');
 	}

 	//initialize variables
  	var vm = this;

  //vm.startSound = ngAudio.load("http://www.myinstants.com/media/sounds/leroy.swf.mp3");

  	/**
   * Set the user - or go to join game if the user is not in the lobby
   * @type {[type]}
   */
 	vm.currentUser =  $cookieStore.get(game.id + game.title);

	/**
	 * The game objkect
	 * @type {Object}
	 */
	vm.game = game;
	/**
	 * The champions array
	 * @type {Array}
	 */
	vm.champions = champions;
	/**
	 * The summoners array
	 * @type {Array}
	 */
	vm.summoners = summoners;
	/**
	 * The items array
	 * @type {[type]}
	 */
	vm.items = items;
	/**
	 * An object containing all expanded spots
	 * @type {Object}
	 */
	vm.expandedSpots = {};
	/**
	 * A boolean value for figuring whether a crad is drawn to avoid multiple requests to the server.
	 * @type {Boolean}
	 */
	vm.cardDrawn = false;

	/**
	 * An array of all users that have yet to pick a slot.
	 * @type {Array}
	 */
	vm.unpickedUsers = GameLobbyService.getUnpickedUsers(vm.game);


	//-------------------------------- Initialization --------------------------------//
	titleService.setTitle('Lobby');

	if( (vm.currentUser === undefined || vm.currentUser.id === undefined )&& !vm.game.gameStarted ){
		if($state.current.name !== 'game.create') {$state.go('game.join', {id: game.id});}
		return;
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
				if(vm.game.id == envelope.data.id){
					vm.game = envelope.data;
					vm.unpickedUsers = GameLobbyService.getUnpickedUsers(vm.game);
					vm.enableNextSpot(vm.game);
				}
				var userIsInGame = _.find(vm.game.users,function (user) {
					return  vm.currentUser.id === user.id;
				});
				if(!angular.isObject(userIsInGame)){
					NotificationService.success(vm.currentUser.nickname + ' has been kicked from the game!');
					$cookieStore.remove(vm.game.id + vm.game.title);
					vm.currentUser = null;
				}
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
		$state.go('game.join', {id: game.id})
		// GameModel.addUser(vm.game.id, vm.currentUser).then(function(model){
		// 	NotificationService.success(vm.currentUser.nickName + " joined the game");


		// });
	};

	vm.joinSpot = function(game, spot){



		if(!spot.user){		

		if(game.gameMode == 'draft' && !game.gameStarted){return;}
		if(game.gameMode == 'normal' && game.gameStarted){return;}

		GameModel.addUserToSpot(game.id, vm.currentUser.id, spot.id)
		.then(function(model){
			
		});
		}
	};

	vm.removeUserFromSpot = function(game, spot){
		GameModel.removeUserFromSpot(game.id, spot.user, spot.id)
		.then(function(model){
			
		});
	};

	vm.leaveGame = function(game){
		GameModel.removeUser(game.id, vm.currentUser.id).then(function(model){});
	};

	vm.kickUser = function (game, user) {
		if(!angular.isObject(game) || !angular.isObject(user)){$log.warn('Game and user must be specified'); return;}
		GameModel.removeUser(game.id, user.id).then(function (model) {
			NotificationService.success(user.nickname + ' has been kicked from the game!');
		});
	}

	vm.userHasTurn = function(game){
		var nextRollableSpot = vm.getNextRollableSpot(game);
		if(typeof nextRollableSpot !== 'undefined' && nextRollableSpot.user === vm.currentUser.id) return true;
		return false;
	}

	vm.getUserWithTurn = function (game) {
		var spot = vm.getNextRollableSpot(game);
		
		if(typeof spot === 'undefined') { return null;}
		
		if(!spot.user){ return null;}
		
		return _.find(game.users, function(user) {
			return user.id === spot.user;
		})
	}

	vm.getNextRollableSpot = function(game){
		var spot = _.find(game.spots, function(spot){
			if(typeof spot.build !== 'undefined') return spot.build.drawn !== true || spot.build.drawn && !spot.build.accepted ;
			else return typeof spot.build === 'undefined'
			});
		return spot;
	}

	vm.getNextUser = function (game) {
		var gameUsers = _.map(game.users, function(user){ return user.id});
		var spotUsers = _.map(game.spots, function (spot) { return spot.user});
		

		var difference = _.difference(gameUsers, spotUsers);
		var nextTurn = _.first(difference);

		return _.find(game.users, function (user) {
			return user.id === nextTurn;
		})
	}

	vm.destroyGame = function(game) {
		// check here if this message belongs to the currentUser
		if (game.user.id == vm.currentUser.id) {
			GameModel.delete(game).then(function(model) {
				// message has been deleted, and removed from vm.messages
			});
		}
	};

	vm.userOwnsGame = function (){
		if(vm.currentUser == null) return false;
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


	vm.getChampion = function(championId) {
		return ChampionService.getChampion(championId);
	}
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
		
		if((spot.user === vm.currentUser.id || vm.userOwnsGame()) && angular.isUndefined(spot.build) && !vm.cardDrawn){
			vm.cardDrawn = true;
			GameModel.drawCard(id, spot.id)
			.then(function(model) {
				vm.cardDrawn = false;
			}).catch(function(err) {
				vm.cardDrawn = false;
			})
		;
		}
	};

	vm.startGame = function(id) {
		// if (spot.user.id == vm.currentUser.id) {
			
		// }
		//ngAudio.play("http://www.myinstants.com/media/sounds/leroy.swf.mp3");
		GameModel.startGame(id).then(function(model) {
				NotificationService.success('Game started!');
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

	/**
	 * Turn the next rollable spot on
	 * @param  {[type]} game [description]
	 * @return {[type]}      [description]
	 */
	vm.enableNextSpot = function(game) {
		if(game.gameStarted){
			var spot = vm.getNextRollableSpot(game);
			if(spot){
				vm.expandedSpots[spot.id] = true;
			}
		}
	}
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
			
			// if(vm.userHasTurn(vm.game)) //ngAudio.play('http://soundbible.com/mp3/Air%20Horn-SoundBible.com-964603082.mp3');
			

		});
	};

	vm.removeSpot = function (game, spot) {
		GameModel.removeSpot(game.id, spot.id)
		.then(function(result) {
			
		})
		.catch(function(err) {
		})
	}


	vm.addSpot = function(game) {
		if(game.spots.length <= game.numberOfSpots){
				GameModel.addSpot(game.id)
				.then(function(result) {
					// body...
				})
		}

	}

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




};