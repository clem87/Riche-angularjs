/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var workauthorCtrl = angular.module('workauthorCtrl', []);

//=====================================================================================
//                          Liste Controle
//=====================================================================================
workauthorCtrl.controller('workauthorListCtrl',
        ['$scope', 'WorkauthorFactory', '$location', '$http', '$rootScope', function
                    ($scope, WorkauthorFactory, $location, $http, $rootScope) {

                $scope.workauthors = WorkauthorFactory.query();


                $scope.create = function () {
                    $location.path('/workauthor-create');
                };

                $scope.delete = function (workauthorId) {
                    WorkauthorFactory.delete({id: workauthorId}).$promise.then(function () {
                        $scope.workauthors = WorkauthorFactory.query();
                        $location.path('/workauthor');
                    });

                }

                $scope.edit = function (id) {
                    $location.path('/workauthor-edit/' + id);
                }

            }
        ]
        );



//=====================================================================================
//                              CREATE CONTROLE
//=====================================================================================

workauthorCtrl.controller('workauthorCreateCtrl',
        ['$scope', 'WorkauthorFactory', '$location', '$http', '$rootScope', '$routeParams',
            function ($scope, WorkauthorFactory, $location, $http, $rootScope, $routeParams) {



                if ($location.path() === '/workauthor-create') {
//            initWorkIfNeed();
                    initPersonIfNeed();
                }
                else if (/^\/workauthor-edit\//.test($location.path())) {
                    $http.get($rootScope.webservice + '/rest/workauthor?id=' + $routeParams.workauthorId).success(function (data) {
                        $scope.workauthor = data;
                    });
                }

                function initPersonIfNeed() {
                    if ($scope.workauthor === undefined) {
                        $scope.workauthor = {
                            'id': null
                        };
                    }
                }


                $scope.confirmForm = function (action) {
                    if (action === ACTION_EDIT) {
                        WorkauthorFactory.update({'id': $scope.workauthor.id}, $scope.workauthor).$promise.then(function () {
                            $location.path('/workauthor');
                        });
                    }
                    else if (action === ACTION_CREATE) {
                        WorkauthorFactory.create($scope.workauthor).$promise.then(function () {
                            $location.path('/workauthor');
                        });

                    }
                };
            }
        ]
        );
//=====================================================================================
//                              VIEW CONTROLE
//=====================================================================================

workauthorCtrl.controller('workauthorViewCtrl',
        ['$scope', 'WorkauthorFactory', '$location', '$http', '$rootScope', '$routeParams',
            function ($scope, WorkauthorFactory, $location, $http, $rootScope, $routeParams) {
                
        $http.get($rootScope.webservice + '/rest/workauthor?id=' + $routeParams.workauthorId).success(function (data) {
            $scope.workauthor = data;
       
        });
                
            }]);