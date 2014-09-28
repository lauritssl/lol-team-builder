angular.module( 'ubteambuilder.gamelobby').factory('ChampionService', ChampionService);


ChampionService.$inject =  ['$http', '$q'];

function ChampionService ($http, $q) {
	

	return {
		 getChampions: function () {
            var deferred = $q.defer();
            var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/champion.json';
            $http.get(url).success(function(result) {
                return deferred.resolve(result.data);
            });

            return deferred.promise;
        },

        getItems: function () {
            var deferred = $q.defer();
            var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/item.json';
            $http.get(url).success(function(result) {
                return deferred.resolve(result.data);
            });

            return deferred.promise;
        },

        getSummoners: function () {
            var deferred = $q.defer();
            var url = 'http://ddragon.leagueoflegends.com/cdn/4.15.1/data/en_GB/summoner.json';
            $http.get(url).success(function(result) {
                return deferred.resolve(result.data);
            });

            return deferred.promise;
        },

        getChampionImage: function(championsImageId){
        	url = "http://ddragon.leagueoflegends.com/cdn/4.15.1/img/champion/";

        	return url + championsImageId;
        },

        getItemImage: function(itemImageId){
            url = "http://ddragon.leagueoflegends.com/cdn/4.15.1/img/item/";

            return url + itemImageId;
        },

        getSummonerImage: function(itemImageId){
            url = "http://ddragon.leagueoflegends.com/cdn/4.15.1/img/spell/";

            return url + itemImageId;
        },
        
        getAbilityImage: function(champion, abilityButton){
            
            url = "http://ddragon.leagueoflegends.com/cdn/4.15.1/img/spell/";

            return url + champion+abilityButton+".png";
        }
	};
};