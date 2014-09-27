

var request = require("request");

module.exports = {
	
	getChampions: function(id, callback) {
		var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/champion.json';
		var champions = [];
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 callback(id, body.data);
			}
		});
	},
	getItems: function(id,callback){
		var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/item.json';
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 callback(id, body.data);
			}
		});
	},
	rollBuild: function(build, items){
		var boots = items[1001];
		build.boots = this.rollBoots(items).id;
	},
	rollBoots: function(items){
		var boots = Object.keys(items).map(function(k) { 
			items[k].id = k;
			return items[k]
			 }).filter(function(item){return item.tags.indexOf('Boots') > -1});

		return boots[Math.floor(Math.random()*(boots.length))];
	}
}

