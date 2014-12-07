'use strict';

// Declare app level module which depends on views, and components
var richeApp = angular.module('richeApp', [
    'ngRoute',
    'workCtrl',
    'sourceCtrl',
    
    'workServices',
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
var ACTION_CREATE='create';

angular.module('ui.bootstrap.demo', ['ui.bootstrap']);


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


richeApp.directive('ngStaticInclude', [
  '$compile',
  '$templateCache',
  function($compile, $templateCache) {
    return {
      restrict: 'A',
      priority: 400,
      compile: function(element, attrs){
        var templateName = attrs.ngStaticInclude;
        var template = $templateCache.get(templateName);
        return function(scope, element){
          element.html(template);
          $compile(element.contents())(scope);
        };
      }
    };
  }
]);