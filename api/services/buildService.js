var async = require("async");

module.exports = {
	rollBuild: function(currentMapId,  items, summoners, champions, maps, callback){

	

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
				vm.rollItems(currentMapId, items, maps, build.champion, function(result){
					build.items = result;
					callback();
				});
			},
			function(callback){
				vm.rollMasteries(,function(result){
					build.masteries = result;
					callback();
				});
			},
			function(callback){
				vm.rollSummoners(summoners, build.jungleItemEnchantment, function(result){
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

				var buildDto = {
								champion: build.champion,
								randomIndex: build.randomIndex,
								boots: build.boots.boots,
								bootsEnchantment: build.boots.bootsEnchantment, 
								item1: build.items.item1,
								item2: build.items.item2,
								item3: build.items.item3,
								item4: build.items.item4,
								item5: build.items.item5,
								jungleItemEnchantment: build.items.jungleItemEnchantment,
								mastery1: build.masteries.mastery1,
								mastery2: build.masteries.mastery2,
								mastery3: build.masteries.mastery3,
								summoner1: build.summoners.summoner1,									
								summoner2: build.summoners.summoner2,
								skill_to_level: build.skill_to_level,
								drawn: false,
								accepted: false,
								denied: false
				};
				callback(buildDto);
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
	rollItems: function(currentMapId, items, maps, championID, callback){
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

		var itemBuild = [];

		//special case for viktor so he gets his hexcore 
		if (championID === 'Viktor') {

			itemBuild = rollNumberOfItems(4, items, jungleEnchantments, build);
			itemBuild[itemBuild.length] = _.first(items, function(item){return item.id === 3198});
		}

		else {
			itemBuild = rollNumberOfItems(5, items, jungleEnchantments, build);
		}

		_.shuffle(itemBuild);
		_.forEach(itemBuild, function(itemId, key){
			build['item'+(key+1)]  = itemId;
		});

		callback(build);

		function rollNumberOfItems(number, items, jungleEnchantments, build) {

			var itemBuild = []

			for(var i = 0; i < number; i++){
				var randomNumber = Math.floor(Math.random()*(items.length));
				itemBuild[i] = items[randomNumber].id;
				
				if(items[randomNumber].group === "JungleItems"){
					jungleEnchantments = jungleEnchantments.filter(function(item) {	return _.contains(item.from, itemBuild[i])}); 		
					var jungleRandomNumber = Math.floor(Math.random()*(jungleEnchantments.length));
					build.jungleItemEnchantment = jungleEnchantments[jungleRandomNumber].id;
				};

				if(items[randomNumber].group == "JungleItems" || items[randomNumber].group == "GoldBase") {
					items = removeSingleTypeItemsIfTaken(items[randomNumber], items);		
				}
				else {
					items.splice(randomNumber, 1)
				};
			}	

			return itemBuild;
		}



		function removeSingleTypeItemsIfTaken(item, items){
			if(item.group == "JungleItems"||item.group == "GoldBase"){
				 items = _.filter(items, function(i){
					return (typeof i.group !== 'undefined' && i.group.indexOf("JungleItems") < 0 && i.group.indexOf("GoldBase") < 0) || typeof i.group === 'undefined';
				})
			}
			return items;
		}
	},


	rollMasteries: function(callback){
		//Roll the masteries on a point by point basis and add them to the build
		var build = {}; 

		var masteriesLeft = 30;
		var tempMasteryArray = [0,0,0];
		var randomNumber = 0;
				
		while (masteriesLeft > 0){
			randomNumber =  Math.floor(Math.random()*(tempMasteryArray.length))
			tempMasteryArray[randomNumber] += 1;

			masteriesLeft--;
		};

		for (i = 0 ; i < tempMasteryArray.length; i++) {
			build["mastery"+(i+1)] = tempMasteryArray[i];			
		}


		callback(build);
	},

	rollMasteriesByNumber: function(number,callback){
		//Roll masteries in blocks of 'number' until less than 'number' is left. Then roll the remainder on a point by point basis
		var build = {}; 


		var masteriesLeft = 30;
		var tempMasteryArray = [0,0,0];
		var randomNumber = 0;
				
		while (masteriesLeft >= number){
			randomNumber =  Math.floor(Math.random()*(tempMasteryArray.length))
			tempMasteryArray[randomNumber] += 1;

			masteriesLeft -= number;
		};

		while (masteriesLeft > 0){
			randomNumber =  Math.floor(Math.random()*(tempMasteryArray.length))
			tempMasteryArray[randomNumber] += 1;

			masteriesLeft -= 1;
		};


		for (i = 0 ; i < tempMasteryArray.length; i++) {
			build["mastery"+(i+1)] = tempMasteryArray[i];			
		}

		callback(build);
	},

	rollSummoners: function(summoners, jungleItem, callback){
		var build = {};

		
		var summoners = summoners.filter(function(summoner){return summoner.modes.indexOf("CLASSIC") > -1});
		var i = summoners.length;
		while( i-- ) {
 		   if( summoners[i].id === 'SummonerSmite') break;
		}
		summoners.splice(i, 1);

		
		var randomNumber = Math.floor(Math.random()*(summoners.length));


		if (jungleItem){

			build.summoner1 = 'SummonerSmite';
			randomNumber = Math.floor(Math.random()*(summoners.length));
			build.summoner2 = summoners[randomNumber].id;
		}
		else {
			build.summoner1 = summoners[randomNumber].id;
			summoners.splice(randomNumber, 1);
			randomNumber = Math.floor(Math.random()*(summoners.length));
			build.summoner2 = summoners[randomNumber].id;
		}


		callback(build);
	},
	rollAbility: function(callback){
		var build = {};
		var abilities = ['Q', 'W', 'E'];

		build.skill_to_level = abilities[Math.floor(Math.random()*(abilities.length))];

		callback(build);
	}
}