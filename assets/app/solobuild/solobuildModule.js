angular.module("ubteambuilder.solobuild",[
	"ubteambuilder.solobuild.controllers"
])
.config(["$stateProvider",function ($stateProvider){

$stateProvider
	.state( 'build', {
		url: '/build',
		templateUrl: 'solobuild/views/solobuild.tpl.html',
    controller : 'soloBuildCtrl',
		controllerAs: 'vm'
	});
}]);
