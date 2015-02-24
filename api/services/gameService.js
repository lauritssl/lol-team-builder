module.exports = {
    rollBuildForGame: function(options, callback) {

    	var self = this;
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


		//Get non picked champions
    	var newChampions = this.getNonPickedChampions(game, champions);


    	//Roll build
		buildService.rollBuild(game.map || 1, items, summoners, newChampions, maps, function(result){
			var build = result;
			spot.build = build;

			_.find(game.spots, function(sp){
				if(sp.id === spot.id) sp = spot;
			});

			Game.update({id: game.id}, game, function(err, result){
				if(err) {
					callback(err);
					return;
				}
				callback(null, build);
			});
		});
	},

    rollBuildsForGame : function(options, callback){
    	var self = this;
    	var game = options.game;
    	var champions = options.champions;

    	if(typeof game === 'undefined' || game === null) {callback(new Error("The game was either null or undefined")); return;}   
    	if(typeof game.spots === 'undefined' || game.spots === null) {callback(new Error("The game has no spots")); return;}   
    	if(typeof champions === 'undefined' || champions === null) {callback(new Error("The champions object is either null or undefined")); return;}   


    	async.forEach(game.spots, function(spot, callback){
    		var tempOptions = options;
    		tempOptions.spotId = spot.id;

    		self.rollBuildForGame(tempOptions, function(err, result){
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

		_.forEach(game.spots, function(spot){
					if(typeof spot.champion != 'undefined'){							
						existingChampions.push(spot.champion);
					}
		});

		//filter away the existing champions
		champions = champions.filter(function(champion){return existingChampions.indexOf(champion.id) < 0});

		return champions;
    }
}