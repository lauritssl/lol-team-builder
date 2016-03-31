

(function () {
	'use strict';
/**
* CreateModalCtrl Controller
*
* Description
* The modal controller for creating a new game
*/
angular.module('ubteambuilder.gamelobby.createModal', []).controller('CreateModalCtrl', CreateModalCtrl);



function CreateModalCtrl ($modalInstance, GameModel, $cookieStore, NotificationService) {
	var vm = this;


 	/**
 	 * Create map array
 	 * @type {Array}
 	 */
 	 vm.maps = [
 	 {name: 'Summoners Rift', id:11},
 	 {name: 'Howling Abyss', id:12},
 	 {name: 'Twisted Treeline', id:10},
 	 ];

 	 /**
 	  * Create an array of gameModes
 	  * @type {Array}
 	  */
 	 vm.gameModes = [
 	 {name: 'draft', id: 'draft'},
 	 {name: 'normal', id: 'normal'}
 	 ];

 	 /**
 	  * Pre selected items
 	  * @type {Object}
 	  */
 	 vm.selected = {
 	 	map: {name: 'Summoners Rift', id:11},
 	 	gameMode: {name: 'normal', id: 'normal'}
	};

 	 /**
 	  * Create the game object
 	  * @type {Object}
 	  */
 	 vm.game = {
 	 	map: 11,
 	 	gameMode: 'normal'
 	 };

 	 /**
 	  * Create the user object
 	  * @type {Object}
 	  */
 	 vm.user = {};


 	 vm.getTitle = function() {
 	 	return vm.user.nickname + ' ' + _.random(0, 10000, false);
	};

 	 /**
 	  * Method for creating a new game
 	  * @param  {Object} game [description]
 	  * @param  {Object} user [description]
 	  */
 	 vm.createGame = function(game, user) {

 	 	game.user = user;

 	 	GameModel
 	 	.create(game)
 	 	.then(function(model) {
 	 		$cookieStore.put(model.id + model.title, model.user);
 	 		$modalInstance.close(model);
 	 	})
 	 	.catch(function(error){
 	 		NotificationService.error('Error! - ' + error.summary +' - Check console.log');
 	 		$modalInstance.dismiss('cancel');
 	 	});
	};

 	 vm.cancel = function() {
 	 	$modalInstance.dismiss('cancel');
 	 };
 	}


 	CreateModalCtrl.$inject = ['$modalInstance', 'GameModel', '$cookieStore', 'NotificationService'];



 }());
