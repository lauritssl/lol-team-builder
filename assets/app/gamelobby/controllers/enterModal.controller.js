
angular.module('ubteambuilder.gamelobby.modals',[])
.controller( 'EnterModalCtrl', EnterModalCtrl);




EnterModalCtrl.$inject = ["$scope"];

 function EnterModalCtrl($scope) {
 	var vm = this;


 	vm.test = "TEST";
 	vm.ok = function() {
        $scope.$dismiss();
    };

    vm.cancel = function() {
    	$scope.$close(true);
    };
}