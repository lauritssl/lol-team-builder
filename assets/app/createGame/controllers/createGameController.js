angular.module('ubteambuilder.createGame.controllers', []).controller('CreateGameCtrl', CreateGameCtrl);


CreateGameCtrl.$inject =  ["GameModel"]

function CreateGameCtrl(){
	var vm = this;
	vm.game = {};
	vm.game.numberOfSpots = 10;


	vm.createGame = function(game) {
		newGame.user = Session.currentUser.id;
		GameModel.create(game).then(function(model) {
			$location.path("/games/"+model.id);
		});
	};
};