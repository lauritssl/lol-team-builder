var request = require("request");
var async = require("async");

module.exports = {
	apiKey : "9b6c3016-6c52-4c6f-9deb-8d5fcfbf0fde",
    lolBasePath : "https://global.api.pvp.net",
    staticPath : "/api/lol/static-data/euw/v1.2",   
    cdnUrl:    "http://ddragon.leagueoflegends.com/cdn",
    cdnVersion: "5.2.2", 
    localization: "en_GB",


    getGameData : function(callback){
    	var self = this;
    	var champions, items, summoners, maps = {}
    	self.getVersion(function(result){
    		self.cdnVersion = result[0];

    		async.parallel([
			function(callback){
				self.getChampions(function(result){
					champions = result;
					callback();
				})
			},
			function(callback){
				self.getItems(function(result){
					items = result;
					callback();
				})
			},
			function(callback){
				self.getSummoners(function(result){
					summoners = result;
					callback();
				})
			},
			function(callback){
				self.getMaps(function(result){
					maps = result;
					callback();
				})
			}
			], function(err){
				if(err) callback(err);
				var result = {
					id : id,
					items: items,
					champions : champions,
					summoners: summoners,
					maps: maps
				};
				callback(null, result);
			});		
    	});
    	
    },
    getChampions: function(callback) {
		var url = this.cdnUrl +"/"+this.cdnVersion + "/data/"+ this.localization  +"/champion.json";
		var champions = [];
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 callback(body);
			}
		});
	},
	getItems: function(callback){
		var url = this.cdnUrl +"/"+this.cdnVersion + "/data/"+ this.localization  +"/item.json";
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 callback(body);
			}
		});
	},
	getSummoners: function(callback){
		var url = this.cdnUrl +"/"+this.cdnVersion + "/data/"+ this.localization  +"/summoner.json";
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 callback(body);
			}
		});
	},
	getMaps: function(callback){
		var url = this.cdnUrl +"/"+this.cdnVersion + "/data/"+ this.localization  +"/map.json";
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 callback(body);
			}
		});
	},
	getVersion: function(callback){
		var url = this.lolBasePath +this.staticPath + "/versions";
		request({
			url: url,
			json: true,
			qs:  {api_key: this.apiKey}
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 callback(body);
			}
		});
	}
}