var Q = require("q");
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
            //Since it is a single draw it will be changed to drawn
            build.drawn = true;
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
            throw new Error("The game was either null or undefined");
            return;
        }
        if (typeof champions === 'undefined' || champions === null) {
            throw new Error("The champions was either null or undefined");
            return;
        }
        if (typeof items === 'undefined' || items === null) {
            throw new Error("The items was either null or undefined");
            return;
        }
        if (typeof summoners === 'undefined' || summoners === null) {
            throw new Error("The summoners was either null or undefined");
            return;
        }
        if (typeof maps === 'undefined' || maps === null) {
            throw new Error("The maps was either null or undefined");
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
    acceptBuild: function(_options){
        var deferred = Q.defer();        
        var self = this;
        var id = _options.id;
        var spotId = _options.spotId;



        return Game.findOne(id)
        .then(function(game){
            game.spots.forEach(function(spot){
                if(spot.id === spotId)spot.build.accepted = true;                
            });

            game.save(function(err, result){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(result);
            })
            return deferred.promise;
        })
    },
    startGame: function(_options){
        var deferred = Q.defer();        
        var self = this;
        var id = _options.id;



        return Game.findOne(id)
        .then(function(game){

            if(typeof game === 'undefined') throw new Error("Game was not found");
            game.gameStarted = true;

            game.save(function(err, result){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(result);
            })
            return deferred.promise;
        })
    },
    endGame: function(_options){
        var deferred = Q.defer();        
        var self = this;
        var id = _options.id;



        return Game.findOne(id)
        .then(function(game){
            if(typeof game === 'undefined') throw new Error("Game was not found");


            game.gameStarted = false;
            game.spots.forEach(function(spot){
                delete spot.build;
                delete spot.user;
            });

            game.save(function(err, result){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(result);
            })
            return deferred.promise;
        })
    },
    drawCard: function(_options) {
        var deferred = Q.defer();        
        var self = this;
        var id = _options.id;
        var spotId = _options.spotId;
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
            if(_.some(game.spots, function(spot){return (spot.id === spotId && typeof spot.build !== 'undefined' && spot.build.drawn)})) throw new Error("Card is already drawn");
            return self.rollBuild(options);
        }).then(function(build) {
            //Since it is a single draw it will be changed to drawn
            build.drawn = true;
            _.forEach(game.spots, function(spot, key) {
                if (spot.id == spotId) {
                    spot.build = build
                }
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
    getNonPickedChampions: function(game, champions) {
        // Get the champions that have already been rolled
        var existingChampions = [];
        _.forEach(game.spots, function(spot) {
            if (typeof spot.build !== 'undefined' && typeof spot.build.champion !== 'undefined') {
                existingChampions.push(spot.build.champion);
            }
        });
        //filter away the existing champions
        champions = champions.filter(function(champion) {
            return existingChampions.indexOf(champion.id) < 0
        });
        return champions;
    }
}