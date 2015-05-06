angular.module( 'services.config', ['lodash'])

.service('config', function(lodash) {

	// private vars here if needed

	return {
		siteName: 'Ultimate Bravery Team Builder',
		// no trailing slash!
		siteUrl: '/',
		apiUrl: '/api',

		currentUser: false
	};

});