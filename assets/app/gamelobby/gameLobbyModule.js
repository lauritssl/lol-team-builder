angular.module( 'ubteambuilder.gamelobby', [
	  'ubteambuilder.gamelobby.controllers',
     'ubteambuilder.gamelobby.services',
      'ubteambuilder.gamelobby.modals',
      'ubteambuilder.gamelobby.createModal'
     ])
.config(["$stateProvider",function ($stateProvider){

$stateProvider
	.state( 'game', {
		url: '/games',
		abstract: true,
		template: "<div ui-view='lobby'> </div>"
	})
	.state( 'game.lobby', {
		url: '/{id}/lobby',
		views: {
			"lobby@game": {
				controller: 'GameLobbyCtrl as gameLobby',
				templateUrl: 'gamelobby/views/game-lobby.tpl.html',
				resolve: {
					game: ["GameModel", "$stateParams", function(GameModel, $stateParams){
						return GameModel.getOne($stateParams.id);
					}],
					champions: ["ChampionService", function(ChampionService){
						return ChampionService.getChampions();
					}],
					items: ["ChampionService", function(ChampionService){
						return ChampionService.getItems();
					}],
					summoners: ["ChampionService", function(ChampionService){
						return ChampionService.getSummoners();
					}]
				}
			}
		}
	}).state('game.create', {
		url: '/create',
		template: "",
		onEnter: ['$state', '$cookieStore', '$stateParams', '$modal', function($state, $cookieStore, $stateParams, $modal){
			$modal.open({
		     	templateUrl: 'gamelobby/views/createModal.tpl.html',
		    	controller: 'CreateModalCtrl as modalCtrl'
			})
			.result
				.then(function(game) {
						$state.go('game.lobby', {id: game.id}, {reload:true});
						return;
		    }, function(){
		    	// cancel modal
		    	return $state.go('home');
		    });
		}]
	})
	.state('game.join', {
		url: '/{id}/join',
		template: "",
		onEnter: ['$state', '$cookieStore', '$stateParams', '$modal', 'GameModel', function($state, $cookieStore, $stateParams, $modal, GameModel){
			$modal.open({
		     	templateUrl: 'gamelobby/views/enterModal.tpl.html',
		    	controller: 'EnterModalCtrl as modalCtrl',
		      	resolve: {
		      		game:function(){
						return GameModel.getOne($stateParams.id);
					}
		      	}
			})
			.result
				.then(function(user) {
						$state.go('game.lobby', {id: $stateParams.id}, {reload:true});
						return;
		    }, function(){
		    	// cancel modal
		    	return $state.go('home');
		    });
		}]
	});

}]);
