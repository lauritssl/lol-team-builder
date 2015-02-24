angular.module('ubteambuilder.createGame.controllers', []).controller('CreateGameCtrl', CreateGameCtrl);


CreateGameCtrl.$inject =  ["GameModel", "Session", "$location", "ChampionService", '$cookieStore']

function CreateGameCtrl(GameModel, Session, $location, ChampionService, $cookieStore){
	var vm = this;
	vm.game = {};
	vm.game.numberOfSpots = 10;
	vm.game.map = 11;


	vm.createGame = function(game) {
		game.user = {};
		game.user.nickname = "Aleksander";
		GameModel.create(game).then(function(model) {
			$cookieStore.put(model.id, model.user);
			$location.path("/games/"+model.id);
		});
	};

	vm.changeMap = function(mapId){
		vm.game.map = mapId;
	};
	vm.getMapImage = function(mapImageId){
		var image = ChampionService.getMapImage(mapImageId);
		return image;
	};
};