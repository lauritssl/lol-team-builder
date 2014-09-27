angular.module('ubteambuilder')
    .controller("MainCtrl", MainCtrl);

MainCtrl['$inject'] = ["$scope", '$location', 'AuthService', 'Session'];


function MainCtrl($scope, $location, AuthService, Session) {

	var vm = this;
	var vm = this;
	Session.currentUser = window.user;
    //Initiate variables
    vm.isAuthorized = AuthService.isAuthorized;
    //Make injections accessible in prototypical functions
    vm.$scope = $scope;
    vm.$location = $location;
    vm.AuthService = AuthService;
	vm.currentUser = Session.currentUser;
	//Run initiation methods
    AuthService.registerAuthEvents(vm);

	vm.go = function(location) {
		$location.path(location);
	}
}