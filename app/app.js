'use strict';

// Declare app level module which depends on views, and components
var richeApp = angular.module('richeApp', [
    'ngRoute',
    'workCtrl',
    'workServices'
//    'personServices'
//  'phonecatServices'
]
        );

//=============================CONSTANT=======================
var ACTION_EDIT = 'edit';
var ACTION_CREATE='create';




/***
 * Définition de quelques variables globales dans l'application
 * @param {type} param
 */
richeApp.run(function ($rootScope) {
    $rootScope.webservice = "http://localhost:8084/springnb/";
    var Constant = 'TUTU';
})





richeApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/work', {
                    templateUrl: 'partials/work-list.html',
                    controller: 'workListCtrl'
                }).when('/work-create/', {
            templateUrl: 'partials/work-create.html',
            controller: 'workCreateCtrl'
        })
                .when("/work-edit/:workId", {
                    templateUrl: 'partials/work-edit.html',
                    controller: 'workCreateCtrl'
                })
                .when("/work-view/:workId", {
                    templateUrl: 'partials/work-view.html',
                    controller: 'workViewCtrl'
                })
                ;

//              .
//      when('/work/:workId', {
//        templateUrl: 'partials/phone-detail.html',
//        controller: 'PhoneDetailCtrl'
//      }).
//      otherwise({
//        redirectTo: '/phones'
//      });
    }]);


