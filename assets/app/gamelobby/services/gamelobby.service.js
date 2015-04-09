

(function () {
   'use strict';
/**
* GameLobbyService Service
*
* Description
* A service providing basic funcitonality to the game lobby controller
*/
angular.module('ubteambuilder.gamelobby.services').factory('GameLobbyService', GameLobbyService);


	
function GameLobbyService () {
    // body...

    var  gameLobbyService = function  gameLobbyService(){};
    

    /**
     * Will return an array of all users that are currently not occupying a spot.
     * @param  {Object} game The game object. Must be defined
     * @return {Array}      [description]
     */
    gameLobbyService.getUnpickedUsers = function(game) {
    	if(typeof game === 'undefined' || game === null) {throw new Error("The game was not defined")}

    	var unpickedUsers = [];
    	var spots = game.spots || [];
    	var users = game.users || [];

    	unpickedUsers = _.filter(users, function(user) {
    		return !_.some(spots, function(spot) {
    			return spot.user === user.id;
    		});
    	});

    	return unpickedUsers;
    };

    return  gameLobbyService;
    
}


GameLobbyService.$inject = [];



}());
