angular.module( 'ubteambuilder.createGame', [
	'ubteambuilder.createGame.controllers'
	])
.config(["$stateProvider",function ($stateProvider){

	$stateProvider.state( 'createGame', {
		url: '/new/game',
		
				authenticate: true,
		views: {
			"main": {
				controller: 'CreateGameCtrl',
				templateUrl: 'createGame/views/createGame.tpl.html',
				controllerAs: 'createGame',	
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
;