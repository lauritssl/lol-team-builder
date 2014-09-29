angular.module('ubteambuilder', [
	'ngCookies',
	'ui.router',	
	'pmkr.components',
	'ngSails',
	'angularMoment',
	'lodash',
	'ui.bootstrap',
	'templates-app',
	'models',
	'services',
	'ubteambuilder.header',
	'ubteambuilder.authentication',
	'ubteambuilder.gamelobby',
	'ubteambuilder.home'

    //MOCKSERVICE
    //'cardable.services.MockService' //TODO: Delete when done with mocking
    ]).config( function  ( $stateProvider, $urlRouterProvider, $locationProvider ) {
	// $urlRouterProvider.otherwise( '/home' );
	$urlRouterProvider.otherwise(function ($injector, $location) {
		if ($location.$$url === '/') {
			window.location = '/home';
		}
		else {
			// pass through to let the web server handle this request
			window.location = $location.$$absUrl;
		}
	});
	$locationProvider.html5Mode(true);
})

    .run( ['$rootScope', 'Session', 'AuthService', '$location',
    	function($rootScope, Session, AuthService, $location) {

    		moment.lang('en');
    		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    			console.log(toState);
    			console.log(AuthService.checkAuthentication(Session));
    			if (toState.authenticate && !AuthService.checkAuthentication(Session)){
    				
        			// User isn’t authenticated
       				$location.path("/login");
   				}
			});
	}]);