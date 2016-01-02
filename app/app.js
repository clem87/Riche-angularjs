'use strict';

// Declare app level module which depends on views, and components
var richeApp = angular.module('richeApp', [
    'ngRoute',
    'ngCookies',
    'workCtrl',
    'pascalprecht.translate',
    'sourceCtrl',
    'personCtrl',
    'workServices',
    'workauthorCtrl',
    'articleCtrl',
    'loginCtrlModule',
    'richeFilter',
    'ui.bootstrap',
    'userService',
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
    $rootScope.webservice = "http://localhost:9090/springnb";
    $rootScope.authenticated = false;
    $rootScope.workQuery = "";
    $rootScope.workOrderProp = "id";
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


/***
 * Interceptor permettant de redigiger vers le login en cas d'erreur 401 (acces non permis)
 * @param {type} param
 */
richeApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($location) {
        $httpProvider.defaults.withCredentials = true;

        return {
            'request': function (test) {
                return test;
            },
            'responseError': function (rejection
                    ) {

                console.log("return " + JSON.stringify(rejection
                        ));

                if (rejection.status === 401) {
                    alert("redir");
                    $location.url('/login?returnUrl=' + $location.path());
                }
            }
        };
    });
});



//richeApp
//        .run(function ($rootScope, $location, userService) {
//            $rootScope.$on("$routeChangeStart", function (event, next, current) {
//                if (next.$$route.authorized && !userService.isConnected()) {
//                    $location.url("/login?returnUrl=" + $location.path());
//                }
//            });
//        });

richeApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/work', {
                    templateUrl: 'partials/work-list.html',
                    controller: 'workListCtrl'
                }).when('/work-create/', {
            templateUrl: 'partials/work-create.html',
            controller: 'workCreateCtrl',
            authorized: true


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
                .when("/login", {
                    templateUrl: 'partials/login.html',
                    controller: 'loginCtrl'
                })
                .when("/article", {
                    templateUrl: 'partials/article-list.html',
                    controller: 'articleCtrlList'
                })
                .when("/article-edit/:articleId", {
                    templateUrl: 'partials/article-edit.html',
                    controller: 'articleCtrlEdit'
                })
                .when("/article-view/:articleId", {
                    templateUrl: 'partials/article-view.html',
                    controller: 'articleCtrlView'
                })



                ;
    }]);

/***
 La traduction
 */
richeApp.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('fr', {
            'help.work.origin': "Origine géographique de l'oeuvre. Séparée par des points virgules",
            'label.work.origin': "Origine",
            'help.work.exactDate': "Date exacte a préciser si elle est connue. C'est un champs texte libre",
            'label.work.exactDate': "Date exacte",
            'label.work.centuryMin': 'Siècle minimum',
            'help.work.centuryMin': 'Année minimum saisir un nombre',
            'label.work.centuryMax': 'Siècle maximum',
            'help.work.centuryMax': 'Année maximal de datation saisir un nombre',
            'form.creation.work.title': "Création d'une oeuvre",
            'form.edit.work.title': "Edition d'une source",
            'form.creation.work.desc': "Ce formulaire permet de créer une oeuvre historique.",
            'form.edit.work.desc': "Ce formulaire permet de d'éditer une oeuvre historique.",
            'label.authors': 'Auteurs',
            'help.authors': "L'auteur de la source",
            'label.source.title': "Titre de l'ouvrage",
            'help.source.title': "Le titre le la source",
            'label.source.articletitle': "Titre de l'article",
            'label.help.articletitle': "Titre de l'article",
            'label.source.volume': "Tomaison",
            'help.source.volume': "Saisir le nombre de tome de l'ouvrage ou le volume de la revue",
            'FOO': 'This is a paragraph',
            'label.source.journal': "Titre de la revue",
            'help.source.journal': "Saisissez le titre de la revue",
            "label.person.label": "Nom à afficher",
            "help.person.label": "Nom à afficher",
            "label.person.prenom": "Prenom",
            "help.person.prenom": "Prénom",
            "label.person.nom": "Nom",
            "help.person.nom": "Nom",
            'help.workauthor.label': "Saissisez le nom et le prénom de l'auteur tel que devant s'afficher",
            'label.workauthor.label': "Nom",
            'msg.footer.txt1': "Copyright &copy; 2015 ??",
            'msg.footer.txt2': "LAMOP"
        });

        $translateProvider.preferredLanguage('fr');
    }]);