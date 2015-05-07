

(function () {
   'use strict';
/**
* NotificationService Service
*
* Description
*  Servie description
*/
angular.module('services').factory('NotificationService', NotificationService);



function NotificationService (notify) {
	notify.config({
		duration: 2000
	});

    var notificationService = function notificationService(){
    
    };
    


    notificationService.success = function(message) {
    	notify(message);
    }

    notificationService.error = function(message) {
    	notify(message);
    }


    return notificationService;
    
}


NotificationService.$inject = ['notify'];



}());
