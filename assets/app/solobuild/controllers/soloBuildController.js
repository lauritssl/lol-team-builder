angular.module('ubteambuilder.solobuild.controllers', [])
.controller( 'soloBuildCtrl', soloBuildCtrl);


soloBuildCtrl.$inject = ['titleService', 'GameModel', '$location', '$sails', 'lodash', '$state', 'utils', '$scope', 'ChampionService'];

function soloBuildCtrl(titleService, GameModel, $location,$sails, lodash, $state, utils, $scope, ChampionService ) {


 	var vm = this;
  titleService.setTitle('Solo Build');
  vm.build = {};

  vm.rollBuild = function(){
    var url = utils.prepareUrl('build/actions/rollBuild/');
    console.log(url);
    $sails.put(url).then(function(build){
      console.log(build.data);
      vm.build = build.data;
    });
  };

}
