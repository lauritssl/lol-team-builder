

var request = require("request");
var async = require("async");

module.exports = {
	
	getChampions: function(callback) {
		var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/champion.json';
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
		var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/item.json';
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
		var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/summoner.json';
		request({
			url: url,
			json: true
		}, function(error, response, body){

			if (!error && response.statusCode === 200) {
				 callback(body);
			}
		});
	},
	rollBuild: function(spot,  items, summoners, champions, callback){

	

		var groups = Object.keys(items.groups).map(function(k) { 
			return items.groups[k]
			 });
		var items = Object.keys(items.data).map(function(k) { 
			items.data[k].id = k;
			return items.data[k]
			 });

		var summoners = Object.keys(summoners.data).map(function(k) { 
			return summoners.data[k]
			 });


		
		

		var vm = this;
		var build = {};
		async.parallel([
			function(callback){
				vm.rollChampion(champions, function(result){
					build.champion = result.champion;
					build.randomIndex = result.randomIndex;
					callback();
				});
			},
			function(callback){
				vm.rollBoots(items, groups, function(result){
					build.boots = result;
					callback();
				});
			},
			function(callback){
				vm.rollItems(items, function(result){
					build.items = result;
					callback();
				});
			},
			function(callback){
				vm.rollMasteries(function(result){
					build.masteries = result;
					callback();
				});
			},
			function(callback){
				vm.rollSummoners(summoners, function(result){
					build.summoners = result;
					callback();
				})
			},
			function(callback){
				vm.rollAbility(function(result){
					build.skill_to_level = result.skill_to_level;
					callback();
				})
			}], function(err){
				callback(build);
			});
		// vm.rollBoots(build, items, groups, function(result1){
		// 	vm.rollItems(result1, items, function(result2){
		// 		vm.rollMasteries(result2, function(result3){
		// 			vm.rollSummoners(result3, summoners, function(result4){						
		// 				callback();
		// 			})
		// 		});
		// 	});
		// });	

		
	},

	rollChampion: function(champions, callback) {
		var build = {};
		var randomIndex = Math.floor(Math.random()*(champions.length));
		build.champion = champions[randomIndex].id;
		build.randomIndex = randomIndex;
		callback(build);
	},

	rollBoots: function(items, groups, callback){
		var build = {};

		var boots = items.filter(function(item){return item.tags.indexOf('Boots') > -1 && item.depth == 2});

		var enchantmentGroups = groups.filter(function(group){return group.id.indexOf('Boots') > -1 && group.id.indexOf('BootsNormal') < 0});

		var enchantment =  enchantmentGroups[Math.floor(Math.random()*(enchantmentGroups.length))].id

		build.boots = boots[Math.floor(Math.random()*(boots.length))].id;
		var bootEnchantments = items.filter(function(item){
			return typeof item.group != 'undefined' && item.group == enchantment;
		});
		bootEnchantments = bootEnchantments.filter(function(boot){
			return boot.from.indexOf(build.boots) > -1;
		});

		build.bootsEnchantment = bootEnchantments[Math.floor(Math.random()*(bootEnchantments.length))].id;
		
		callback(build);
	},
	rollItems: function(items, callback){
		var build = {};

		var items = items.filter(function(item){return item.into.length ==0 && item.depth > 1 && typeof item.requiredChampion == 'undefined' && item.name.indexOf("Sightstone") < 0 && ((typeof item.maps != 'undefined' && item.maps[1] != false) || typeof item.maps == 'undefined')});
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

		callback(build);
	},

	rollMasteries: function(callback){
		var build = {}; 

		var totalMasteries = 30;
		build.mastery1 = Math.floor(Math.random()*(totalMasteries));
		totalMasteries -= build.mastery1;
		build.mastery2 = Math.floor(Math.random()*(totalMasteries));
		totalMasteries -= build.mastery2;
		build.mastery3 =  totalMasteries;

		callback(build);
	},

	rollSummoners: function(summoners, callback){
		var build = {};
		var summoners = summoners.filter(function(summoner){return summoner.modes.indexOf("CLASSIC") > -1})
		var randomNumber = Math.floor(Math.random()*(summoners.length));

		build.summoner1 = summoners[randomNumber].id;
		summoners.splice(randomNumber, 1);
		randomNumber = Math.floor(Math.random()*(summoners.length));
		build.summoner2 = summoners[randomNumber].id;

		callback(build);
	},
	rollAbility: function(callback){
		var build = {};
		var abilities = ['Q', 'W', 'E'];

		build.skill_to_level = abilities[Math.floor(Math.random()*(abilities.length))];

		callback(build);
	}
}

