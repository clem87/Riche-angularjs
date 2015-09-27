/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var userService = angular.module('userService', ['ngResource']);

userService.factory('UserFactory', ['$resource', '$rootScope',
     function ($resource, $rootScope) {
         alert("userService");
             return {
        isConnected: function() {
            // ...
        },
        signIn: function() {
            // ...
            $rootScope.$broadcast("connectionStateChanged");
        },
        signOut: function() {
            // ...
            $rootScope.$broadcast("connectionStateChanged");
        }
     };
 }
]);
    
    
//    
//module.service("userService", function($rootScope, $http) {
//    return {
//        isConnected: function() {
//            // ...
//        },
//        signIn: function() {
//            // ...
//            $rootScope.$broadcast("connectionStateChanged");
//        },
//        signOut: function() {
//            // ...
//            $rootScope.$broadcast("connectionStateChanged");
//        }
//    };
//});



//var userService =  angular.service("userService", function($rootScope, $http) {
//    return {
//        isConnected: function() {
//            // ...
//        },
//        signIn: function() {
//            // ...
//            $rootScope.$broadcast("connectionStateChanged");
//        },
//        signOut: function() {
//            // ...
//            $rootScope.$broadcast("connectionStateChanged");
//        }
//    };
//});