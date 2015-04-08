angular.module('ubteambuilder.header', [])
.controller( 'HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$scope', '$state'];

 function HeaderCtrl( $scope, $state) {

    var navItems = [
        // {title: 'Games', translationKey: 'navigation:Games', url: '/games', cssClass: 'fa fa-comments'},
    ];
    $scope.navItems = navItems;
};