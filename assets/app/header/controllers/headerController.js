angular.module('ubteambuilder.header', [])
.controller( 'HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$scope', '$state', 'Session'];

 function HeaderCtrl( $scope, $state, Session ) {
    $scope.currentUser = Session.currentUser;

    var navItems = [
        // {title: 'Games', translationKey: 'navigation:Games', url: '/games', cssClass: 'fa fa-comments'},
    ];
    $scope.navItems = navItems;
};