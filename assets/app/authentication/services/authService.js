
angular.module('ubteambuilder.authentication.services').factory('AuthService', AuthService);


AuthService['$inject'] = ["$http", "Session", "$cookieStore", "AUTH_EVENTS", "$rootScope", "$location", '$sails', 'utils', '$q'];

function AuthService($http, Session, $cookieStore, AUTH_EVENTS, $rootScope, $location, $sails, utils, $q) {
    return {
        login: function (credentials) {
            var deferred = $q.defer();
            $sails.post("auth/local", credentials, function(model) {
                return deferred.resolve(model);
            });
        },
        logOut: function () {
            Session.destroy();
            $cookieStore.remove("Session");
            delete $http.defaults.headers.common['Authorization'];
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

        },
        checkAuthentication: function(session) {
            if(typeof session.currentUser != 'undefined'){
                if (typeof session.currentUser.id != 'undefined') {
                    return true;
                } 
            } 
            else{                
                return false;
            }

        },
        isAuthorized: function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (this.isAuthenticated() &&
              authorizedRoles.indexOf(Session.userRole) !== -1);
        },
        registerAuthEvents: function(scope) {
            var vm = this;
            vm.scope = scope;

            //Events
            $rootScope.$on("$locationChangeStart", function (event, current) {

                // if (Session.currentUser == null) {
                //     console.log($location.$$absUrl);
                //     if($location.$$url != "/register"){
                //      }else{                      
                //         $location.path("/login");
                //      }
                // }
            });

            $rootScope.$on(AUTH_EVENTS.notAuthenticated, function (event, next) {

                vm.logOut();
                vm.scope.loggedIn = false;
            });

            $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, next) {
                vm.scope.loggedIn = false;
                $location.path("/login");
            });
            $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, next) {
                $location.path($location.$$url);
           });
        }
    };

}