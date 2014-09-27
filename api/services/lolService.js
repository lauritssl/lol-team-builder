

var request = require("request");

module.exports.lolService = {
	
	getChampions: function(id, callback) {
		var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/champion.json';
		var champions = [];
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 callback(id, body);
			}
		});
	}
}

