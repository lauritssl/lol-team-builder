module.exports = {
    rollBuildForGame: function(options, callback) {

    	var game = options.game;
    	var spotId = options.spotId;
    	var champions = options.champions;
    	var items = options.items;
    	var summoners = options.summoners;
    	var maps = options.maps;

    	
    	if(typeof game === 'undefined' || game === null) {callback(new Error("The game was either null or undefined")); return;}
    	if(typeof spotId === 'undefined' || spotId === null) {callback(new Error("The spotId was either null or undefined")); return;}
    	if(typeof champions === 'undefined' || champions === null) {callback(new Error("The champions was either null or undefined")); return;}
    	if(typeof items === 'undefined' || items === null) {callback(new Error("The items was either null or undefined")); return;}
    	if(typeof summoners === 'undefined' || summoners === null) {callback(new Error("The summoners was either null or undefined")); return;}
    	if(typeof maps === 'undefined' || maps === null) {callback(new Error("The maps was either null or undefined")); return;}

    	var spot = _.find(game.spots, function(spot){return spot.id == spotId});

    	if(typeof spot === 'undefined' || spot === null)  {callback(new Error("The specified spot could not be found")); return;}

		var build = _.find(game.spots, function(spot){return build.id == spot.build});
		if(typeof build === 'undefined' || build === null)  {callback(new Error("The specified build could not be found")); return;}

		//Get non picked champions
    	var newChampions = getNonPickedChampions(game, champions);


    	//Roll build
		buildService.rollBuild(game.map || 1, spot, items, summoners, newChampions, maps, function(result){
			var build = result;
			callback();

			async.parallel([
				function(callback){
					Spot.update({id: spot.id}, {champion: build.champion}, function(err, result){
						if(err) {
							callback(err);
							return;
						}
						callback();
					})
				},
				function(callback){
					Build.update({id: build.id}, build, function(err, result){
						if(err) {
							console.log(err);
							callback(err);
							return;
						}											
						
						callback();
						
					})
				}
			], function(err){
				if(err) {
					callback(err)
					return;
				}
				callback(null, build);
			});
		});
			
			
		

    },

    rollBuildsForGame : function(options, callback){
    	var self = this;
    	var game = options.game;

    	if(typeof game === 'undefined' || game === null) {callback(new Error("The game was either null or undefined")); return;}   
    	if(typeof game.spots === 'undefined' || game.spots === null) {callback(new Error("The game has no spots")); return;}   

		options.champions = Object.keys(champions.data).map(function(k) {return champions.data[k]});

    	async.forEach(game.spots, function(spot, callback){
    		var tempOptions = options;
    		tempOptions.spotId = spot.id;

    		self.rollBuild(tempOptions, function(err, result){
    			if(err) {callback(err); return; }    			
    			options.champions.splice(result.randomIndex, 1);
    			callback();
    		});
    	}, function(err){
    		if(err) {
    			callback(err);
    			return;
    		}
    		callback();
    	});

    },

    getNonPickedChampions : function(game, champions){
    	// Get the champions that have already been rolled
    	var existingChampions = [];
		var newChampions = Object.keys(champions.data).map(function(k) {return champions.data[k]});

		_.forEach(game.spots, function(spot){
					if(typeof spot.champion != 'undefined'){							
						existingChampions.push(spot.champion);
					}
		});

		//filter away the existing champions
		newChampions = newChampions.filter(function(champion){return existingChampions.indexOf(champion.id) < 0});

		return newChampions;
    }
}