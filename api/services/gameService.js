var Q = require("q");
module.exports = {

    create: function(_options) {
        var deferred = Q.defer();
        var self = this;
        var user = _options.user;

        if (typeof user === 'undefined' || user === null) {
            throw new Error("The user was either null or undefined");
            return;
        }


        if (typeof _options.title === 'undefined' || _options.title === null) {
            throw new Error("The title was either null or undefined");
            return;
        }

        var spots = [];
        var spot = {
            id: utilsService.generateGUID()
        };
        spots.push(spot);

        var users = [];
        users.push(user);


        var model = {
            user: _options.user,
            title: _options.title,
            users: users,
            map: _options.map,
            private: _options.private,
            spots: spots,
            gameMode: _options.gameMode
        };

        if(typeof _options.numberOfSpots !== 'undefined' || _options.numberOfSpots === null) {model.numberOfSpots = _options.numberOfSpots;}
        if(model.private){ model.password = _options.password;}



        return Game.create(model);

    },

    destroy: function(_id){
        var deferred = Q.defer();

        if(typeof _id==='undefined' || _id=== null){
            throw new Error("Id is null or undefined");
            return;
        }

        Game.findOne(_id)
        .then(function(game){
            if (typeof game==='undefined'||game===null){
                throw new Error ("game wasnt found");
                return;
            }
        Game.destroy({id: game.id}).exec(function destroyCB(err, destroyed){
                if (err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(destroyed);
            });
        });
        return deferred.promise;
    },

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
            };
            game = gameModel;
            return self.rollBuild(options);
        }).then(function(build) {
            //Since it is a single draw it will be changed to drawn
            build.drawn = true;
            _.forEach(game.spots, function(spot, key) {
                if (spot.id === spotId) spot.build = build;
            });

            game.save(function(err){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(game);
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
        buildService.rollBuild(game.map || 11, items, summoners, newChampions, maps, function(result) {
            deferred.resolve(result);
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },
    /**
     * [rollBuilds description]
     * @param  {[type]} _options [description]
     * @return {[type]}          [description]
     */
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
            };
            game = gameModel;
            return self.rollBuilds(options);
        }).then(function(builds) {
            _.forEach(game.spots, function(spot, key) {
                spot.build = builds[key];
            });

            game.save(function(err){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(game);
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

            game.save(function(err){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(game);
            });
            return deferred.promise;
        });
    },

    denyBuild: function(_options){
        var deferred = Q.defer();
        var self = this;
        var id = _options.id;
        var spotId = _options.spotId;



        return Game.findOne(id)
        .then(function(game){
            game.spots.forEach(function(spot){
                if(spot.id === spotId)spot.build.denied = true;
            });

            game.save(function(err){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(game);
            });
            return deferred.promise;
        });
    },
    startGame: function(_options){
        var deferred = Q.defer();
        var self = this;
        var id = _options.id;



        return Game.findOne(id)
        .then(function(game){

            if(typeof game === 'undefined') throw new Error("Game was not found");


            game.gameStarted = true;

            if(game.gameMode === 'draft'){
                return self.startDraft({game:game});

            }else{
                return self.startNormal({game:game});
            }
        });
    },
    /**
     * Method for starting a normal game
     * @param  {[type]} _options [description]
     * @return {[type]}          [description]
     */
    startNormal : function(_options) {
        var deferred = Q.defer();
        var self = this;
        var game = _options.game;

        game.save(function(err){
            if(err){
                deferred.reject(err);
                return;
            }
            deferred.resolve(game);
        });
        return deferred.promise;
    },
    /**
     * Method for starting a draft type game
     * @param  {[type]} _options [description]
     * @return {[type]}          [description]
     */
    startDraft: function(_options) {
        var deferred = Q.defer();
        var self = this;
        var game = _options.game;

        return lolDataService.getGameData()
        .then(function(gameData) {
            var options = {
                items: gameData.items,
                champions: gameData.champions,
                summoners: gameData.summoners,
                maps: gameData.maps,
                game: game
            };

            return self.rollBuilds(options);


        })
        .then(function(builds) {
            _.forEach(game.spots, function(spot, key) {
                spot.build = builds[key];
                spot.build.accepted = true;
            });

            game.users = _.shuffle(game.users);
            game.save(function(err){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(game);
            });
            return deferred.promise;
        });
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

            game.save(function(err){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(game);
            });
            return deferred.promise;
        });
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
            };
            game = gameModel;
            if(_.some(game.spots, function(spot){return (spot.id === spotId && typeof spot.build !== 'undefined' && spot.build.drawn);})) throw new Error("Card is already drawn");
            return self.rollBuild(options);
        }).then(function(build) {
            //Since it is a single draw it will be changed to drawn
            build.drawn = true;
            _.forEach(game.spots, function(spot, key) {
                if (spot.id == spotId) {
                    spot.build = build;
                }
            });

            game.save(function(err){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(game);
            });

            return deferred.promise;
        });
    },
    rerollBuild: function(_options) {
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
            };
            game = gameModel;
            return self.rollBuild(options);
        }).then(function(build) {
            //Since it is a single draw it will be changed to drawn
            build.drawn = true;
            _.forEach(game.spots, function(spot, key) {
                if (spot.id == spotId) {
                    spot.build = build;
                }
            });

            game.save(function(err){
                if(err){
                    deferred.reject(err);
                    return;
                }
                deferred.resolve(game);
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
            return existingChampions.indexOf(champion.id) < 0;
        });
        return champions;
    }
};
