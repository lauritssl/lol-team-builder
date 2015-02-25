var Q = require("Q");
module.exports = {
    rollBuildForGame: function(_options) {
        var deferred = Q.defer();        
        var self = this;
        var id = _options.id;
        var spotId = _options.spotId;
        var items, champions, summoners, maps, game, builds;
        return Q.all([Game.getOne(id), lolDataService.getGameData]).then(function(gameModel, gameData) {
            options = {
                items: gameData.items,
                champions: gameData.champions,
                summoners: gameData.summoners,
                maps: gameData.maps,
                game: gameModel
            }
            game = gameModel;
            return self.rollBuild(options);
        }).then(function(build) {
            _.forEach(game.spots, function(spot, key) {
                if (spot.id === spotId) spot.build = build
            });
            
            game.save(function(err, result){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(result);
            });

            return deferred.promise;            
        });
    },
    rollBuild: function(_options) {
        var deferred = Q.defer();
        var self = this;
        var champions = _options.champions;
        var items = _options.items;
        var summoners = _options.summoners;
        var game = _options.game;
        var maps = _options.maps;

        if (typeof game === 'undefined' || game === null) {
            callback(new Error("The game was either null or undefined"));
            return;
        }
        if (typeof champions === 'undefined' || champions === null) {
            callback(new Error("The champions was either null or undefined"));
            return;
        }
        if (typeof items === 'undefined' || items === null) {
            callback(new Error("The items was either null or undefined"));
            return;
        }
        if (typeof summoners === 'undefined' || summoners === null) {
            callback(new Error("The summoners was either null or undefined"));
            return;
        }
        if (typeof maps === 'undefined' || maps === null) {
            callback(new Error("The maps was either null or undefined"));
            return;
        }
        //Get non picked champions
        var newChampions = this.getNonPickedChampions(game, champions);
        //Roll build
        buildService.rollBuild(game.map || 1, items, summoners, newChampions, maps, function(result) {
            deferred.resolve(result);
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },
    rollBuilds: function(_options) {
        var game = _options.game;
        var promises = [];
        var builds = [];
        var self = this;
        var i = 1;

        var chain = game.spots.reduce(function(soFar, item) {
            return soFar.then(function(build) {
                _options.champions.splice(build.randomIndex, 1);
                builds.push(build);
                return self.rollBuild(_options);
            });
        }, Q.resolve(self.rollBuild(_options)));

        return chain.then(function(lastBuild){
            return builds;
        });
    },
    rollBuildsForGame: function(_options) {
        var deferred = Q.defer();
        var self = this;
        var id = _options.id;
        var items, champions, summoners, maps, game, builds;
        return Q.spread([Game.findOne(id), lolDataService.getGameData()], function(gameModel, gameData) {
            options = {
                items: gameData.items,
                champions: gameData.champions,
                summoners: gameData.summoners,
                maps: gameData.maps,
                game: gameModel
            }
            game = gameModel;
            return self.rollBuilds(options);
        }).then(function(builds) {
            _.forEach(game.spots, function(spot, key) {
                spot.build = builds[key];
            });
            
            game.save(function(err, result){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(result);
            });
            return deferred.promise;
        });

        
    },
    drawCard: function(options) {},
    getNonPickedChampions: function(game, champions) {
        // Get the champions that have already been rolled
        var existingChampions = [];
        _.forEach(game.spots, function(spot) {
            if (typeof spot.champion != 'undefined') {
                existingChampions.push(spot.champion);
            }
        });
        //filter away the existing champions
        champions = champions.filter(function(champion) {
            return existingChampions.indexOf(champion.id) < 0
        });
        return champions;
    }
}