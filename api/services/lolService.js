

var request = require("request");
var async = require("async");

module.exports = {
	

	apiKey : "9b6c3016-6c52-4c6f-9deb-8d5fcfbf0fde",
    lolBasePath : "https://global.api.pvp.net",
    staticPath : "/api/lol/static-data/euw/v1.2",   
    cdnUrl:    "http://ddragon.leagueoflegends.com/cdn",
    cdnVersion: "5.2.2", 
    localization: "en_GB",

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
	},
	rollBuild: function(currentMapId, spot,  items, summoners, champions, maps, callback){

	

		groups = Object.keys(items.groups).map(function(k) { 
			return items.groups[k]
			 });
		items = Object.keys(items.data).map(function(k) { 
			items.data[k].id = k;
			return items.data[k]
			 });

		summoners = Object.keys(summoners.data).map(function(k) { 
			return summoners.data[k]
			 });

		maps = maps.data;
		
		

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
				vm.rollItems(currentMapId, items, maps, function(result){
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
	rollItems: function(currentMapId, items, maps, callback){
		var build = {};




		//Get jungle items and jungle enchantments before they're pulled from the array
		var jungleEnchantments = _.filter(items, function(item){
					return (typeof item.group !== 'undefined' && item.group === "JungleItems")&&  item.into.length === 0;
				});
		var jungleItems = _.filter(items, function(item){
					return (typeof item.group !== 'undefined' && item.group === "JungleItems") && item.depth === 2;
				});



		var items = items.filter(function(item){return item.into.length === 0 && item.depth > 1 && typeof item.requiredChampion == 'undefined' && item.name.indexOf("Sightstone") < 0  && item.name.indexOf("Wrig") < 0});
		
		


		items = items.filter(function(item) {
				return (typeof item.group != 'undefined' && item.group.indexOf("Boots") < 0 && item.group.indexOf("RelicBase") < 0)  && item.group.indexOf("JungleItems") < 0  || typeof item.group == 'undefined';
		});

		//add the jungle items back in.
		items = items.concat(jungleItems);
		//sort out unpurchasable items
		items = items.filter(function(item){
			return !_.contains(maps[currentMapId].UnpurchasableItemList, item.id);
		});

		



		for(var i = 1; i <= 5; i++){
			var randomNumber = Math.floor(Math.random()*(items.length));
			build["item" + i] = items[randomNumber].id;
			if(items[randomNumber].group === "JungleItems"){
				jungleEnchantments = jungleEnchantments.filter(function(item) {	return _.contains(item.from, build["item" + i])}); 		
				var jungleRandomNumber = Math.floor(Math.random()*(jungleEnchantments.length));
				build.jungleItemEnchantment = jungleEnchantments[jungleRandomNumber].id;
			};
			if(items[randomNumber].group == "JungleItems" || items[randomNumber].group == "GoldBase") items = removeSingleTypeItemsIfTaken(items[randomNumber], items);		
			else items.splice(randomNumber, 1);
		}		

		callback(build);


		function removeSingleTypeItemsIfTaken(item, items){
			if(item.group == "JungleItems"){
				 items = _.filter(items, function(i){
					return (typeof i.group !== 'undefined' && i.group.indexOf("JungleItems") < 0 && i.group.indexOf("GoldBase") < 0) || typeof i.group === 'undefined';
				})
			}
			if(item.group == "GoldBase"){
				items = _.filter(items, function(i){
					return (typeof i.group !== 'undefined' && i.group.indexOf("GoldBase") < 0 && i.group.indexOf("JungleItems") <0) || typeof i.group === 'undefined';
				})
			}
			return items;
		}
	},


	rollMasteries: function(callback){
		var build = {}; 

		var totalMasteries = 30;
		var masteryArray = ["1", "2", "3"];

		var randomNumber =  Math.floor(Math.random()*(masteryArray.length));
		build["mastery"+masteryArray[randomNumber]] = Math.floor(Math.random()*(totalMasteries));
		totalMasteries -= build["mastery"+masteryArray[randomNumber]];
		masteryArray.splice(randomNumber, 1);

		randomNumber =  Math.floor(Math.random()*(masteryArray.length));
		build["mastery"+masteryArray[randomNumber]] = Math.floor(Math.random()*(totalMasteries));
		totalMasteries -= build["mastery"+masteryArray[randomNumber]];
		masteryArray.splice(randomNumber, 1);

		build["mastery"+masteryArray[0]] =  totalMasteries;

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

