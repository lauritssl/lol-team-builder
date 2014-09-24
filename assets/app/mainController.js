angular.module('ubteambuilder')
    .controller("MainCtrl", MainCtrl);

MainCtrl['$inject'] = ["$scope", '$location', 'AuthService', 'Session'];


function MainCtrl($scope, $location, AuthService, Session) {
	console.log("Hej!");

	var vm = this;
	var vm = this;
    //Initiate variables
    vm.isAuthorized = AuthService.isAuthorized;
    //Make injections accessible in prototypical functions
    vm.$scope = $scope;
    vm.$location = $location;
    vm.AuthService = AuthService;
	vm.currentUser = {};

	//Run initiation methods
    AuthService.registerAuthEvents(vm);
    AuthService.checkAuthentication(vm, Session);

	vm.go = function(location) {
		console.log("boom");
		$location.path(location);
	}
}