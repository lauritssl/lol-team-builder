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

HomeCtrl.$inject = ['config', 'titleService', 'GameModel' ];

 function HomeCtrl(config, titleService, GameModel ) {
 	var vm = this;  
	vm.game = {};
	vm.newGame = {};

   	titleService.setTitle('Home');
	vm.currentUser = config.currentUser;


	vm.createGame = function(newGame) {
		newGame.user = config.currentUser.id;
		GameModel.create(newGame).then(function(model) {

			vm.newGame = {};
		});
	};
};