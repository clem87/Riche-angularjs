/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var personCtrl = angular.module('personCtrl', []);

sourceCtrl.controller('personListCtrl', ['$scope', 'PersonFactory', '$location', '$http', '$rootScope', function ($scope, PersonFactory, $location, $http, $rootScope) {
        $scope.persons = PersonFactory.query();


        $scope.create = function () {
            $location.path('/person-create');
        };


        $scope.delete = function (personId) {
            PersonFactory.delete({id: personId}).$promise.then(function () {
                $scope.persons = PersonFactory.query();
                $location.path('/person');
            });

        }

        $scope.edit = function (id) {
            $location.path('/person-edit/' + id);
        }



    }
]);

//=========================================================================================================
//                      VIEW CONTROLE
//=========================================================================================================
workCtrl.controller('personViewCtrl', ['$scope', '$rootScope', 'WorkFactory', '$location', '$routeParams', '$http', function ($scope, $rootScope, WorkFactory, $location, $routeParams, $http) {


        $http.get($rootScope.webservice + '/rest/author?id=' + $routeParams.personId).success(function (data) {
            $scope.person = data;
        });

        $scope.edit = function (id) {
            $location.path('/person-edit/' + id);
        }




    }
]
        );


//=========================================================================================================
//                          CREATE CONTROLE
//=========================================================================================================
sourceCtrl.controller('personCreateCtrl', ['$scope', 'PersonFactory', '$location', '$http', '$rootScope', '$routeParams', function ($scope, PersonFactory, $location, $http, $rootScope, $routeParams) {



        if ($location.path() === '/person-create') {
//            initWorkIfNeed();
            initPersonIfNeed();
        }
        else if (/^\/person-edit\//.test($location.path())) {
            $http.get($rootScope.webservice + '/rest/author?id=' + $routeParams.personId).success(function (data) {
                $scope.person = data;
            });
        }


        function initPersonIfNeed() {
            if ($scope.person === undefined) {
                $scope.person = {
                    'id': null,
//                    'authors': new Array()
                };
            }
        }
        $scope.back = function () {
            $location.path('/person');
        };


        $scope.confirmForm = function (action) {
            if (action === ACTION_EDIT) {
                PersonFactory.update({'id': $scope.person.id}, $scope.person).$promise.then(function () {
                    $location.path('/person');
                });
            }
            else if (action === ACTION_CREATE) {
                if($scope.person.type==='scientifique'){
                    PersonFactory.createScientifique($scope.person).$promise.then(function () {
                    $location.path('/person');
                });
                    
                    
                }
                else if($scope.person.type==='historique')
                    alert("histo")
                PersonFactory.create($scope.person).$promise.then(function () {
                    $location.path('/person');
                });
            }
        };

    }
]
        );