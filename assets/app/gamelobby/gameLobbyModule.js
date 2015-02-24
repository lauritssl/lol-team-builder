angular.module( 'ubteambuilder.gamelobby', [
	  'ubteambuilder.gamelobby.controllers',
     'ubteambuilder.gamelobby.services',
      'ubteambuilder.gamelobby.modals'
     ])
.config(["$stateProvider",function ($stateProvider){

	$stateProvider    
	.state( 'game', {
		url: '/games/:id',
		views: {
			"main": {
				controller: 'GameLobbyCtrl',
				templateUrl: 'gamelobby/views/gamelobby.tpl.html',
				controllerAs: 'gameLobby',	
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
	})
	.state('game.join', {
		url: '/join',
		template: "<div> TEST </div>",
		resolve: {
			test: function(){
				console.log("test");
				return "test";
			}
		},
		onEnter: ['$state', '$cookieStore', '$stateParams', '$modal', function($state, $cookieStore, $stateParams, $modal){

			 $modal.open({
	            templateUrl: 'gamelobby/views/enterModal.tpl.html',
	            controller: 'EnterModalCtrl as modalCtrl',
	            resolve: {
	            	gameId: $stateParams.id
	            }
	        }).result.then(function(result) {
	            if (result) {
	                $cookieStore.put($stateParams.id, 123);
					$state.go('game', {id: $stateParams.id});
	            }
	        });

			
		}]
	});

}])

