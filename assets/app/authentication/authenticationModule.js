

//Register main module
angular.module('ubteambuilder.authentication', [

     'ubteambuilder.authentication.controllers',
     'ubteambuilder.authentication.directives',
     'ubteambuilder.authentication.services'

]).config(["$stateProvider",function ($stateProvider){

	$stateProvider.state( 'login', {
		url: '/login',
		views: {
			"main": {
				controller: 'LoginCtrl',
				templateUrl: 'authentication/views/login.tpl.html',
				controllerAs: 'authentication',				
			}
		}
	});
}]);

angular.module('ubteambuilder.authentication.controllers', []);
angular.module('ubteambuilder.authentication.directives', []);
angular.module('ubteambuilder.authentication.services', []);