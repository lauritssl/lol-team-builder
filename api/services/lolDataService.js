var request = require("request");
var async = require("async");
var Q = require("q");


module.exports = {
	apiKey : "9b6c3016-6c52-4c6f-9deb-8d5fcfbf0fde",
    lolBasePath : "https://global.api.pvp.net",
    staticPath : "/api/lol/static-data/euw/v1.2",   
    cdnUrl:    "http://ddragon.leagueoflegends.com/cdn",
    cdnVersion: "5.5.1", 
    localization: "en_GB",


    getGameData : function(){
    	var deferred = Q.defer();


    	var self = this;
    	var champions, items, summoners, maps = {}

    	self.getVersion()
    	.then(function(result){
    		//self.cdnVersion = result[0];
    		return [self.getChampions(), self.getItems(), self.getSummoners(), self.getMaps()];
    	})
    	.spread(function(_champions, _items, _summoners, _maps){
    		var result = {
					items: _items,
					champions : _champions,
					summoners: _summoners,
					maps: _maps
			};

			deferred.resolve(result);
    	})
    	.catch(function(err){
    		deferred.reject(err);
    	});

    	return deferred.promise;


   //  	self.getVersion(function(result){
   //  		self.cdnVersion = result[0];

   //  		async.parallel([
			// function(callback){
			// 	self.getChampions(function(result){
			// 		champions = Object.keys(result.data).map(function(k) {return result.data[k]});
			// 		callback();
			// 	})
			// },
			// function(callback){
			// 	self.getItems(function(result){
			// 		items = result;
			// 		callback();
			// 	})
			// },
			// function(callback){
			// 	self.getSummoners(function(result){
			// 		summoners = result;
			// 		callback();
			// 	})
			// },
			// function(callback){
			// 	self.getMaps(function(result){
			// 		maps = result;
			// 		callback();
			// 	})
			// }
			// ], function(err){
			// 	if(err) callback(err);
			// 	var result = {
			// 		items: items,
			// 		champions : champions,
			// 		summoners: summoners,
			// 		maps: maps
			// 	};
			// 	callback(null, result);
			// });		
   //  	});
    	
    },
    getChampions: function() {
    	var deferred = Q.defer();

		var url = this.cdnUrl +"/"+this.cdnVersion + "/data/"+ this.localization  +"/champion.json";
		var champions = [];
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				var array = Object.keys(body.data).map(function(k) { 
				return body.data[k]
				 });
				deferred.resolve(array);
				return;
			}
			deferred.reject(error);

		});

		return deferred.promise;
	},
	getItems: function(){
    	var deferred = Q.defer();

		var url = this.cdnUrl +"/"+this.cdnVersion + "/data/"+ this.localization  +"/item.json";
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				deferred.resolve(body);
				return;				
			}
			deferred.reject(error);

		});
		return deferred.promise;

	},
	getSummoners: function(){
    	var deferred = Q.defer();


		var url = this.cdnUrl +"/"+this.cdnVersion + "/data/"+ this.localization  +"/summoner.json";
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 deferred.resolve(body);
				return;		
			}
			deferred.reject(error);
		});
		return deferred.promise;
	},
	getMaps: function(){
    	var deferred = Q.defer();

		var url = this.cdnUrl +"/"+this.cdnVersion + "/data/"+ this.localization  +"/map.json";
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 deferred.resolve(body);
				return;		
			}
			deferred.reject(error);
		});
		return deferred.promise;
	},
	getVersion: function(){
    	var deferred = Q.defer();

		var url = this.lolBasePath +this.staticPath + "/versions";
		request({
			url: url,
			json: true,
			qs:  {api_key: this.apiKey}
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 deferred.resolve(body);
				return;		
			}
			deferred.reject(error);
		});
		return deferred.promise;
	}
}