'use strict';

// Declare app level module which depends on views, and components
var richeApp = angular.module('richeApp', [
    'ngRoute',
    'workCtrl',
    'sourceCtrl',
    'personCtrl',
    'workServices',
    'workauthorCtrl',
    'richeFilter',
    'ui.bootstrap'
//    'ui.bootstrap'
//    'personServices'
//  'phonecatServices'
]
        );

//angular.module('myModule', ['ui.bootstrap']);

//=============================CONSTANT=======================
var ACTION_EDIT = 'edit';
var ACTION_CREATE = 'create';

angular.module('ui.bootstrap.demo', ['ui.bootstrap']);


/***
 * Définition de quelques variables globales dans l'application
 * @param {type} param
 */
richeApp.run(function ($rootScope) {
    $rootScope.webservice = "http://localhost:8084/springnb/";
    var Constant = 'TUTU';
})


/***
 * Directive permettant de creéer un bouton back qui retourne dans l'historique de navigation. pou rl'inclure dans une page <button back>Back</button>
 * @param {type} param1
 * @param {type} param2
 */
richeApp.directive('back', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);



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
                .when("/source", {
                    templateUrl: 'partials/source-list.html',
                    controller: 'sourceListCtrl'
                })

                .when("/source-create", {
                    templateUrl: 'partials/source-create.html',
                    controller: 'sourceCreateCtrl'
                })
                .when("/source-edit/:sourceId", {
                    templateUrl: 'partials/source-edit.html',
                    controller: 'sourceCreateCtrl'
                })
                .when("/source-view/:sourceId", {
                    templateUrl: 'partials/source-view.html',
                    controller: 'sourceViewCtrl'
                })
                .when("/person", {
                    templateUrl: 'partials/person-list.html',
                    controller: 'personListCtrl'
                })
                .when("/person-create", {
                    templateUrl: 'partials/person-create.html',
                    controller: 'personCreateCtrl'
                })

                .when("/person-edit/:personId", {
                    templateUrl: 'partials/person-edit.html',
                    controller: 'personCreateCtrl'
                })
                .when("/person-view/:personId", {
                    templateUrl: 'partials/person-view.html',
                    controller: 'personViewCtrl'
                })
                .when("/workauthor-create", {
                    templateUrl: 'partials/workauthor-create.html',
                    controller: 'workauthorCreateCtrl'
                })
                .when("/workauthor", {
                    templateUrl: 'partials/workauthor-list.html',
                    controller: 'workauthorListCtrl'
                })

                .when("/workauthor-edit/:workauthorId", {
                    templateUrl: 'partials/workauthor-edit.html',
                    controller: 'workauthorCreateCtrl'
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

