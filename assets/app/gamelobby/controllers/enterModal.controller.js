
angular.module('ubteambuilder.gamelobby.modals',[])
.controller( 'EnterModalCtrl', EnterModalCtrl);




EnterModalCtrl.$inject = ["$scope", 'GameModel', 'gameId'];

 function EnterModalCtrl($scope, GameModel, gameId) {
 	var vm = this;


 	vm.test = "TEST";
 	vm.ok = function() {
        $scope.$dismiss();
    };

    vm.cancel = function() {
    	$scope.$close(true);
    };
}