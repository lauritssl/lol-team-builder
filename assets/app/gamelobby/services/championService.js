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

        getChampionImage: function(championsImageId){
        	url = "http://ddragon.leagueoflegends.com/cdn/4.15.1/img/champion/";

        	return url + championsImageId;
        }
	};
};