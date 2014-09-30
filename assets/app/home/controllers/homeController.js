angular.module( 'ubteambuilder.home', [])
.config(["$stateProvider",function ($stateProvider){

	$stateProvider.state( 'home', {
		url: '/home',		
				authenticate: true,
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/views/home.tpl.html',
				controllerAs: 'home',				
			}
		}
	})
}]).controller( 'HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['Session', 'titleService', 'GameModel', '$location', '$sails', 'lodash'];

 function HomeCtrl(Session, titleService, GameModel, $location,$sails, lodash ) {
 	console.log("i get here!");
 	var vm = this;  
	vm.game = {};
	vm.newGame = {};	
   	titleService.setTitle('Home');
	vm.currentUser = Session.currentUser;
	vm.games = [];

	$sails.on('game', function (envelope) {
		console.log(envelope);
		switch(envelope.verb) {
			case 'created':
				vm.games.unshift(envelope.data);
				break;
			case 'updated':
				console.log(envelope.data);
				console.log(vam.games);
				for(var key in vm.games){
					if(vm.games[key] == envelope.id){
						vm.games[key] = envelope.data;
					}
				}
				console.log(vm.games);
				break;
			case 'destroyed':
				lodash.remove(vm.currentUser.games, {id: envelope.id});
				lodash.remove(vm.games, {id: envelope.id});
				break;
		}
	});


	vm.deleteGame = function(game) {
		GameModel.delete(game).then(function(model) {
		});
	};

	vm.joinGame = function(gameId){
		$location.path("/games/"+gameId);
	}

	GameModel.getAll(vm).then(function(models) {
		vm.currentUser.games = models.filter(function(game){if(typeof game.user != 'undefined') return game.user.id == vm.currentUser.id});
		vm.games = models.filter(function(game){if(typeof game.user != 'undefined') {return game.user.id != vm.currentUser.id} else{return true}});
	})
};