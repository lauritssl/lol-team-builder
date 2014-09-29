angular.module( 'ubteambuilder.gamelobby', [
	  'ubteambuilder.gamelobby.controllers',
     'ubteambuilder.gamelobby.services'
     ])
.config(["$stateProvider",function ($stateProvider){

	$stateProvider.state( 'game', {
		url: '/games/:id',
		
				authenticate: true,
		views: {
			"main": {
				controller: 'GameLobbyCtrl',
				templateUrl: 'gamelobby/views/gamelobby.tpl.html',
				controllerAs: 'gameLobby',	
				resolve: {

				 game: ["GameModel", "$stateParams", function(GameModel, $stateParams){

					return GameModel.getOne($stateParams.id)
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
	});
}])
