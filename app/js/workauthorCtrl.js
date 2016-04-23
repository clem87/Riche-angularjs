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
        ['$scope', 'WorkauthorFactory', '$location', '$http', '$rootScope', 'dataServiceWorkAuthor', function
                    ($scope, WorkauthorFactory, $location, $http, $rootScope, dataServiceWorkAuthor) {


                $scope.data = dataServiceWorkAuthor;

                if ($scope.data.workauthors === null) {
                    WorkauthorFactory.query().$promise.then(function (dataWork) {
                        $scope.data.workauthors = dataWork;
                        dataServiceWorkAuthor.workauthors = dataWork;
                    });
                }


                $scope.create = function () {
                    $location.path('/workauthor-create');
                };

                $scope.delete = function (workauthorId) {
                    if (confirm("Confirmez vous la suppression ?")) {
                        WorkauthorFactory.delete({id: workauthorId}).$promise.then(function () {

//                            $scope.data.workauthors = WorkauthorFactory.query();
                            for (var i = 0; i < $scope.data.workauthors.length; i++) {
                                var itWork = $scope.data.workauthors[i];

                                if (itWork.id === workauthorId) {
                                    $scope.data.workauthors.splice(i, 1);
                                    break;
                                }
                            }
                        })
                                .then(function () {
                                    $location.path('/workauthor');
                                })
                                ;
                    }
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
        ['$scope', 'WorkauthorFactory', '$location', '$http', '$rootScope', '$routeParams', 'dataServiceWorkAuthor',
            function ($scope, WorkauthorFactory, $location, $http, $rootScope, $routeParams, dataServiceWorkAuthor) {

                $scope.data = dataServiceWorkAuthor;


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
                            $scope.changeOrAddWorkInList($scope.workauthor);
                            $location.path('/workauthor');
                        });
                    }
                    else if (action === ACTION_CREATE) {
                        WorkauthorFactory.create($scope.workauthor).$promise.then(function () {
                            $scope.changeOrAddWorkInList($scope.workauthor);

                            $location.path('/workauthor');
                        });

                    }
                };

                /***
                 * Place le work envoyé en argument dans la liste des work du dataServiceWork
                 * @param {type} work
                 * @returns {undefined}
                 */
                $scope.changeOrAddWorkInList = function (workAuthor) {
                    for (var i = 0; i < $scope.data.workauthors.length; i++) {
                        var itWork = $scope.data.workauthors[i];

                        if (itWork.id === workAuthor.id) {
                            $scope.data.workauthors[i] = workAuthor;
                            return;
                        }
                    }
                    $scope.data.workauthors.push(workAuthor);
                }

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
                $http.get($rootScope.webservice + '/rest/work/getWorkForAuthor?authorId=' + $routeParams.workauthorId).success(function (data) {
                    $scope.works = data;

                });



//                           $scope.edit = function (id) {
//                    $location.path('/workauthor-edit/' + id);
//                }

            }]);