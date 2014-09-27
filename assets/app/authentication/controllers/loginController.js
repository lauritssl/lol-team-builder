


angular.module('ubteambuilder.authentication.controllers').controller("LoginCtrl", LoginCtrl);

LoginCtrl["$inject"] = ["$rootScope", "AUTH_EVENTS", "AuthService"];


function LoginCtrl($rootScope, AUTH_EVENTS, AuthService) {

    var vm = this;

    //Initiate Variables
    vm.credentials = {
        username: '',
        password: ''
    };

    console.log($rootScope);
    vm.AuthService = AuthService;
    vm.$rootScope = $rootScope;
    vm.AUTH_EVENTS = AUTH_EVENTS;

};



LoginCtrl.prototype.login = function(credentials) {
    var vm = this;
    vm.AuthService.login(credentials).then(function() {
        credentials.username = '';
        credentials.password = '';
    }, function() {
        console.log(vm.rootScope);
        vm.$rootScope.$broadcast(vm.AUTH_EVENTS.loginFailed);
    });
};