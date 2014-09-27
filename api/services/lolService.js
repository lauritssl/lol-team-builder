

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
				 callback(id, body);
			}
		});
	},
	rollBuild: function(build, items){

		var groups = Object.keys(items.groups).map(function(k) { 
			return items.groups[k]
			 });
		var items = Object.keys(items.data).map(function(k) { 
			items.data[k].id = k;
			return items.data[k]
			 });

		this.rollBoots(build, items, groups);
		this.rollItems(build, items);
	},
	rollBoots: function(build, items, groups){
		var boots = items.filter(function(item){return item.tags.indexOf('Boots') > -1});

		var enchantmentGroups = groups.filter(function(item){return groups.indexOf('Boots') > -1});


		build.boots = boots[Math.floor(Math.random()*(boots.length))].id;
		var bootEnchantments = items.filter(function(item){if(typeof item.from != 'undefined') return item.from.indexOf(build.Boots)});

		build.bootsEnchantment = bootEnchantments[Math.floor(Math.random()*(boots.length))].id;
	},
	rollItems: function(build, items){
		var items = items.filter(function(item){return item.into.length ==0 && item.depth > 1 && ((typeof item.maps != 'undefined' && item.maps[1] != false) || typeof item.maps == 'undefined')});
		items = items.filter(function(item) {
				return (typeof item.group != 'undefined' && item.group.indexOf("Boots") < 0 && item.group.indexOf("RelicBase") < 0)  || typeof item.group == 'undefined';
		});

		var randomNumber = Math.floor(Math.random()*(items.length));
		build.item1 = items[randomNumber].id;
		items.splice(randomNumber, 1);

		randomNumber = Math.floor(Math.random()*(items.length));
		build.item2 = items[randomNumber].id;
		items.splice(randomNumber, 1);

		randomNumber = Math.floor(Math.random()*(items.length));
		build.item3 = items[randomNumber].id;
		items.splice(randomNumber, 1);

		randomNumber = Math.floor(Math.random()*(items.length));
		build.item4 = items[randomNumber].id;
		items.splice(randomNumber, 1);

		randomNumber = Math.floor(Math.random()*(items.length));
		build.item5 = items[randomNumber].id;
		items.splice(randomNumber, 1);
	}
}

