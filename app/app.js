'use strict';

// Declare app level module which depends on views, and components
var richeApp = angular.module('richeApp', [
    'ngRoute',
    'workCtrl',
    'pascalprecht.translate',
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
                        .when("/workauthor-view/:workauthorId", {
                            templateUrl: 'partials/workauthor-view.html',
                    controller: 'workauthorViewCtrl'
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

/***
La traduction
 */
richeApp.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('fr', {
    'label.authors': 'Auteurs',
    'help.authors': "L'auteur de la source",
    'label.source.title': "Titre",
    'help.source.title': "Le titre le la source",
    'label.source.articletitle':"Titre de l'article",
    'label.help.articletitle':"Titre de l'article",
    'FOO': 'This is a paragraph',
    
    
    "label.person.label":"Nom à afficher",
    "help.person.label":"Nom à afficher",
    "label.person.prenom":"Prenom",
    "help.person.prenom":"Prénom",
    "label.person.nom":"Nom",
    "help.person.nom":"Nom",
    
    'help.workauthor.label':"Saissisez le nom et le prénom de l'auteur tel que devant s'afficher",
    'label.workauthor.label': "Nom",
    
    'msg.footer.txt1': "Copyright &copy; 2015 ??",
    'msg.footer.txt2': "LAMOP"
  });
  
  
 
//  $translateProvider.translations('fr', {
//    'TITLE': 'Bonjour',
//    'FOO': 'Ceci est un paragraphr'
//  });
 
  $translateProvider.preferredLanguage('fr');
}]);