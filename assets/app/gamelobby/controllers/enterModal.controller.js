angular.module('ubteambuilder.gamelobby.modals',[])
.controller( 'EnterModalCtrl', EnterModalCtrl);

EnterModalCtrl.$inject = ['$modalInstance', 'GameModel','game', '$cookieStore', 'NotificationService'];

function EnterModalCtrl($modalInstance, GameModel, game, $cookieStore, NotificationService) {
 	
	var vm = this;

	vm.game = game;
 	/**
 	 * The function for the entermodal
 	 * @param  {[type]} user [description]
 	 * @return {[type]}      [description]
 	 */
 	vm.ok = function(user, gameId, password) {

 	GameModel.addUser(gameId, user, password).then(function(result){
 		$cookieStore.put(gameId + vm.game.title, result);
    	$modalInstance.close(result);
 	})
 	.catch(function(err){
 		if(err.status === 401){
 			NotificationService.error('The password is incorrect');
 		}else{
 			$modalInstance.dismiss('cancel');
 		}
 	});

  };


  vm.cancel = function() {
  	$modalInstance.dismiss('cancel');
  };
}