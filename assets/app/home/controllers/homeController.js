angular.module( 'ubteambuilder.home', [])
.config(["$stateProvider",function ($stateProvider){

	$stateProvider.state( 'home', {
		url: '/home',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/views/home.tpl.html',
				controllerAs: 'home',				
			}
		}
	})
}]).controller( 'HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['Session', 'titleService', 'GameModel', '$location' ];

 function HomeCtrl(Session, titleService, GameModel, $location ) {
 	console.log("i get here!");
 	var vm = this;  
	vm.game = {};
	vm.newGame = {};

   	titleService.setTitle('Home');
	vm.currentUser = Session.currentUser;

	
	vm.createGame = function(newGame) {
		console.log(newGame);
		newGame.user = Session.currentUser.id;
		GameModel.create(newGame).then(function(model) {
			console.log(model);
			$location.path("/games/"+model.id);
		});
	};
};