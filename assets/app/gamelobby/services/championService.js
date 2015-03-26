angular.module( 'ubteambuilder.gamelobby.services', []).factory('ChampionService', ChampionService);


ChampionService.$inject =  ['$http', '$q'];

function ChampionService ($http, $q) {
	
    var apiKey = "9b6c3016-6c52-4c6f-9deb-8d5fcfbf0fde";
    var lolBasePath = "https://global.api.pvp.net";
    var staticPath = "/api/lol/static-data/euw/v1.2";   
    var cdnUrl =    "http://ddragon.leagueoflegends.com/cdn";
    var cdnVersion = "5.2.2"; 
    var localization = "en_GB";


	return {
        cdnVersion : cdnVersion,
		 getChampions: function () {
            var deferred = $q.defer();
            var queryParameters = "champData=image,passive,spells,stats,tags&api_key="+apiKey;
            //var url = lolBasePath + staticPath + "/champion?" + queryParameters;
            var url = cdnUrl +"/"+this.cdnVersion + "/data/"+ localization  +"/champion.json";

            var test = "";
            $http({url:url, cache:true, method: 'GET'}).success(function(result) {
                return deferred.resolve(result.data);
            });

            return deferred.promise;
        },

        getItems: function () {
            var deferred = $q.defer();
            var url = cdnUrl +"/"+this.cdnVersion + "/data/"+ localization  +"/item.json";
            $http({url:url, cache:true, method: 'GET'}).success(function(result) {
                return deferred.resolve(result.data);
            });

            return deferred.promise;
        },

        getSummoners: function () {
            var deferred = $q.defer();
            var url = cdnUrl +"/"+this.cdnVersion + "/data/"+ localization  +"/summoner.json";
            $http({url:url, cache:true, method: 'GET'}).success(function(result) {
                return deferred.resolve(result.data);
            });

            return deferred.promise;
        },
        getVersion: function () {
            var deferred = $q.defer();
            var url = lolBasePath +staticPath + "/versions?api_key="+apiKey;
            $http({url:url, cache:true, method: 'GET'}).success(function(result) {
                return deferred.resolve(result);
            });

            return deferred.promise;
        },


        getChampionImage: function(championsImageId){
        	url = cdnUrl +"/"+this.cdnVersion + "/img/champion/";

        	return url + championsImageId;
        },
        getChampionBackground: function(championsImageId){
            url = cdnUrl + "/img/champion/loading/";

            return url + championsImageId + '_0.jpg';
        },

        getItemImage: function(itemImageId){
            url = cdnUrl +"/"+this.cdnVersion + "/img/item/";

            return url + itemImageId + '.png';
        },

        getSummonerImage: function(itemImageId){
            url = cdnUrl +"/"+this.cdnVersion + "/img/spell/";

            return url + itemImageId;
        },
        
        getAbilityImage: function(champion, ability){
            
            url = cdnUrl +"/"+this.cdnVersion + "/img/spell/";

            return url + ability;
        },

        getMapImage: function(mapImageId){
             url = cdnUrl +"/"+this.cdnVersion + "/img/map/map";

            return url + mapImageId+".png";
        }
	};
};