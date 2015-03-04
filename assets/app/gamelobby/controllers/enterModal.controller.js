angular.module('ubteambuilder.gamelobby.modals',[])
.controller( 'EnterModalCtrl', EnterModalCtrl);

EnterModalCtrl.$inject = ["$modalInstance", 'GameModel', 'gameId', '$cookieStore'];

function EnterModalCtrl($modalInstance, GameModel, gameId, $cookieStore) {
 	var vm = this;

 	vm.ok = function(user) {

 	GameModel.addUser(gameId, user).then(function(result){
 		$cookieStore.put(gameId, result);
    	$modalInstance.close(result);
 	})
 	.catch(function(err){
 		$modalInstance.dismiss('cancel');
 	});

  };

  vm.cancel = function() {
  	$modalInstance.dismiss('cancel');
  };
}