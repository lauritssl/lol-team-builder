angular.module('ubteambuilder').controller("MainCtrl", MainCtrl);
MainCtrl['$inject'] = ["$scope", '$location', 'ChampionService', '$state'];

function MainCtrl($scope, $location, ChampionService, $state) {
    var vm = this;

    vm.state = $state;
    //Initiate variables
    ChampionService.getVersion().then(function(result){
    ChampionService.cdnVersion = result.dd;
    });
    //Make injections accessible in prototypical functions
    vm.$scope = $scope;
    vm.$location = $location;

    vm.go = function(location) {
        $location.path(location);
    }
}