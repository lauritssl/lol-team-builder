angular.module('ubteambuilder.gamelobby.modals',[])
.controller( 'EnterModalCtrl', EnterModalCtrl);

EnterModalCtrl.$inject = ["$modalInstance", 'GameModel', 'gameId'];

function EnterModalCtrl($modalInstance, GameModel, gameId) {
 	var vm = this;

 	vm.ok = function(user) {
    $modalInstance.close(user);
  };

  vm.cancel = function() {
  	$modalInstance.dismiss('cancel');
  };
}