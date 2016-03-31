/**
 * BuildController
 *
 * @description :: Server-side logic for managing builds
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var request = require("request");
 var async = require("async");
 var Q = require("q");



module.exports = {
	rollBuild : function (req, res){
    var deferred = Q.defer();
		var items, champions, summoners, maps, build;
		lolDataService.getGameData().then(function (gameData){
			buildService.rollBuild(11, gameData.items, gameData.summoners, gameData.champions, gameData.maps, function(build){
        console.log("BuildController has rolled");
				 res.json(build);
			});
    });

	}
};



getGameData = function(){
var deferred = Q.defer();

var self = this;
var champions, items, summoners, maps = {};

lolDataService.getGameData()
.then(function(result){
	result = {
		items: result.items,
		champions : result.champions,
		summoners: result.summoners,
		maps: result.maps
};

deferred.resolve(result);
})
.catch(function(err){
	deferred.reject(err);
});

return deferred.promise;
};
