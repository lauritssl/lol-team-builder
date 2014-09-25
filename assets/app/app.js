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
]).config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {
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

.run( function run () {
	moment.lang('en');
})