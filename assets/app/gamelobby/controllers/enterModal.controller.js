
angular.module('ubteambuilder.gamelobby.modals',[])
.controller( 'EnterModalCtrl', EnterModalCtrl);




EnterModalCtrl.$inject = ["$scope", 'GameModel'];

 function EnterModalCtrl($scope, GameModel) {
 	var vm = this;


 	vm.test = "TEST";
 	vm.ok = function() {
        $scope.$dismiss();
    };

    vm.cancel = function() {
    	$scope.$close(true);
    };
}