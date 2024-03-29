angular.module( 'services.utils', ['lodash'])

.service('utils', function(lodash, config) {

	return {
		prepareUrl: function(uriSegments) {
			if (lodash.isNull(config.apiUrl)) {
				apiUrl = 'https://api.test';
			}
			else {
				apiUrl = config.apiUrl;
			}

			return apiUrl + "/" + uriSegments;
		},

		addQueryParameter: function(url, key, value) {

			if(url.indexOf('?') > 0 ){url += '&'}
			else{url += '?'}
			return url + key + "=" + value;
		},

		showDatetime: function(string, format) {
			return moment(string).fromNow();
		}

	};

});