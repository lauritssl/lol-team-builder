angular.module('ubteambuilder', [
	'ngCookies',
	'ngAudio',
	'ui.router',	
	'pmkr.components',
	'angular-data.DSCacheFactory',
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
	'ubteambuilder.home',
	'ubteambuilder.createGame'

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

    .run( ['$rootScope', 'Session', 'AuthService', '$location', 'DSCacheFactory', '$http',
    	function($rootScope, Session, AuthService, $location, DSCacheFactory, $http) {

    		moment.lang('en');

    		 DSCacheFactory('defaultCache', {
        maxAge: 900000, // Items added to this cache expire after 15 minutes.
        cacheFlushInterval: 6000000, // This cache will clear itself every hour.
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
        storageMode: 'localStorage', // This cache will sync itself with `localStorage`.
    });

    $http.defaults.cache = DSCacheFactory.get('defaultCache');

    		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    			
    			if (toState.authenticate && !AuthService.checkAuthentication(Session)){
    				
        			// User isn’t authenticated
   				}
			});
	}]);