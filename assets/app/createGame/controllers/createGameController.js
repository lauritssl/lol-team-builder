angular.module('ubteambuilder.createGame.controllers', []).controller('CreateGameCtrl', CreateGameCtrl);


CreateGameCtrl.$inject =  ["GameModel", "Session", "$location"]

function CreateGameCtrl(GameModel, Session, $location){
	var vm = this;
	vm.game = {};
	vm.game.numberOfSpots = 10;


	vm.createGame = function(game) {
		game.user = Session.currentUser.id;
		GameModel.create(game).then(function(model) {
			$location.path("/games/"+model.id);
		});
	};
};