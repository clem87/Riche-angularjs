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
    'ui.bootstrap',
    'userService',
    'ngCookies'

//    'ui.bootstrap'
//    'personServices'
//  'phonecatServices'
]
        );




richeApp.controller('navigation',['$cookies',
        function ($rootScope, $scope, $http, $location) {

            var authenticate = function (credentials, callback) {
                if (credentials !== undefined) {
                    var req = {
                        method: 'POST',
                        url: 'http://localhost:9090/springnb/j_spring_security_check',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        data: "j_username=" + credentials.j_username + "&j_password=" + credentials.j_password};

                    $http(req).then(
                            function (data) {

                                alert("succes " + JSON.stringify(data));
                            },
                            function () {
                                alert("fail");
                            });
                }
            };

            authenticate();
            $scope.credentials = {};
            $scope.login = function () {
                alert($scope.credentials.j_username);

                authenticate($scope.credentials, function () {

                    if ($rootScope.authenticated) {
                        alert("1")
                        $location.path("/");
                        $scope.error = false;
                    } else {
                        alert("2")
                        $location.path("/login");
                        $scope.error = true;
                    }
                }

                );
            };
        }]);




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
    $rootScope.webservice = "http://localhost:9090/springnb/";
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



richeApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($location) {


        return {
            'request': function (test) {
//                alert('request ' + test);

                return test;

            },
            'responseError': function (rejection
                    ) {

                console.log("return " + JSON.stringify(rejection
                        ));

                if (rejection.status === 401) {
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
                    controller: 'navigation'
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
            'label.work.centuryMin': 'Siècle max',
            'help.work.centuryMin': 'Année minimum saisir un nombre',
            'label.work.centuryMax': 'Siècle maximum',
            'help.work.centuryMax': 'Année maximal de datation saisir un nombre',
            'form.creation.work.title': "Création d'une source",
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



//  $translateProvider.translations('fr', {
//    'TITLE': 'Bonjour',
//    'FOO': 'Ceci est un paragraphr'
//  });

        $translateProvider.preferredLanguage('fr');
    }]);