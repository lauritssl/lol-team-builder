angular.module( 'ubteambuilder.home', [])
.config(["$stateProvider",function ($stateProvider){

	$stateProvider.state( 'home', {
		url: '/home',	
		controller: 'HomeCtrl',
		templateUrl: 'home/views/home.tpl.html',
		controllerAs: 'home'			
	})
}]).controller( 'HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['titleService', 'GameModel', '$location', '$sails', 'lodash', '$state'];

 function HomeCtrl(titleService, GameModel, $location,$sails, lodash, $state ) {


 	var vm = this;  
	vm.game = {};
	vm.newGame = {};	
   	titleService.setTitle('Home');
	vm.games = [];
	vm.searchTerm = "";

	$sails.on('game', function (envelope) {
		console.log(envelope);
		switch(envelope.verb) {
			case 'created':
				vm.games.unshift(envelope.data);
				break;
			case 'updated':
				console.log(envelope.data);
				console.log(vm.games);
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
		$state.go('game.lobby', {id: gameId});
	}

	vm.createGame = function() {
		$state.go('game.create');
	}

	vm.getMapName = function(mapId){
		if(mapId === 11) {return "Summoners Rift";}
		if(mapId === 12) {return "Howling Abyss";}
	}

	GameModel.getAll(vm).then(function(models) {
		vm.games = models;
	})
};