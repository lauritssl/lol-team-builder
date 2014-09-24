angular.module('ubteambuilder.header', [])
.controller( 'HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$scope', '$state', 'config'];

 function HeaderCtrl( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;

    var navItems = [
        // {title: 'Games', translationKey: 'navigation:Games', url: '/games', cssClass: 'fa fa-comments'},
    ];
    $scope.navItems = navItems;
};