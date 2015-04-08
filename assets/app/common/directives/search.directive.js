

(function () {
   'use strict';




function ApiSearchDirective (GameModel, $timeout) {
    // body...

    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            model: '=ngModel',
            timeoutTime: '@',
            results: '=apiSearch'
        },      
        link: function(scope) {
          scope.timeoutTime = scope.timeoutTime || 500;
          scope.$watch('model', function() {
            if(scope.timeout) {$timeout.cancel(scope.timeout);}
            scope.timeout = $timeout(function(){
                
                if(scope.model.length > 0){
                    
                    GameModel.getAll({name: scope.model})
                    .then(function(result){

                        if(!angular.isArray(result)) {throw result;}


                        scope.results = result;
                    })
                    .catch(function(){

                    });
                }
            }, scope.timeoutTime);
          });
        }
    };
    
}


ApiSearchDirective.$inject = ['GameModel', '$timeout'];

/**
* ApiSearchDirective Service
*
* Description
* A directive for ensuring that the specified type parameter is unique
*/
angular.module('directives.search', []).directive('apiSearch', ApiSearchDirective);

}());
