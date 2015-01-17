angular.module('ubteambuilder.createGame.controllers', []).controller('CreateGameCtrl', CreateGameCtrl);


CreateGameCtrl.$inject =  ["GameModel", "Session", "$location", "ChampionService"]

function CreateGameCtrl(GameModel, Session, $location, ChampionService){
	var vm = this;
	vm.game = {};
	vm.game.numberOfSpots = 10;
	vm.game.map = 11;


	vm.createGame = function(game) {
		game.user = Session.currentUser.id;
		GameModel.create(game).then(function(model) {
			$location.path("/games/"+model.id);
		});
	};

	vm.getMapImage = function(mapImageId){
		return ChampionService.getMapImage(mapImageId);
	}
};