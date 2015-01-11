/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var sourceCtrl = angular.module('sourceCtrl', []);


//=======================================================================================
////                LISTE CONTROLE
//=======================================================================================


sourceCtrl.controller('sourceListCtrl', ['$scope', 'SourceFactory', '$location', '$http', '$rootScope', function ($scope, SourceFactory, $location, $http, $rootScope) {

        $scope.sources = SourceFactory.query();

        $scope.create = function () {
            $location.path('/source-create');
        };

        $scope.delete = function (userId) {

            SourceFactory.delete({id: userId}).$promise.then(function () {
                $scope.sources = SourceFactory.query();
                $location.path('/source');
            });

        }

        $scope.edit = function (id) {
            $location.path('/source-edit/' + id);
        }

        $scope.back = function () {
            $location.path('/source');
        };

    }]);


//=======================================================================================
//                                      CREATE & EDIT CONTROLE
//=======================================================================================

sourceCtrl.controller('sourceCreateCtrl', ['$scope', 'SourceFactory', '$location', '$http', '$rootScope', '$routeParams', function ($scope, SourceFactory, $location, $http, $rootScope, $routeParams) {
        // Chargement deds première instruction pour edit et create. 
        if ($location.path() === '/source-create') {
//            initWorkIfNeed();
            initSourceIfNeed();
        }
        else if (/^\/source-edit\//.test($location.path())) {
            $http.get($rootScope.webservice + '/rest/source?id=' + $routeParams.sourceId).success(function (data) {
                $scope.source = data;
            });
        }


        $http.get($rootScope.webservice + '/rest/bibliographictype/getall').success(function (data) {
//            alert(JSON.stringify(data))
            $scope.bibliographicTypeDispo = data;
        });

        function initSourceIfNeed() {
            if ($scope.source === undefined) {
                $scope.source = {
                    'id': null,
//                    'authors': new Array()

                };
            }
        }





        $scope.getAuteurCompletion = function (userString) {

            return $http.get($rootScope.webservice + '/rest/author/find?userselection=' + userString).success(
                    function (data) {

                    }).then(function (resp) {

                return resp.data;
            })

        }

        $scope.authorUserSelection = function ($item, $model, $label) {
            alert("aa")
            if ($scope.source.authors === undefined) {
                $scope.source.authors = new Array();
            }

            var i = $scope.source.authors.length;
            present = false;
            while (i--) {
                if ($scope.source.authors[i].id === $item.id) {
                    present = true;
                }
            }
            if (!present) {
                $scope.source.authors.push($item);
            }

            $scope.sourceUserSelection = null;

        };

        $scope.authorUserSelection2 = function ($item, $model, $label) {
//            if ($scope.source.relationPerson === undefined) {
//                $scope.source.relationPerson =  new Array();
//            }
//
//            var i = $scope.source.relationPerson.length;
//            present = false;
//            while (i--) {
//                if ($scope.source.relationPerson[i].id === $item.id) {
//                    present = true;
//                }
//            }
//            if (!present) {
//                $scope.source.relationPerson.push(
//                        {
//                            source:{id : $scope.source.id},
//                            person:{id: $item.id}
//                        }
//                          );
//            }
//
//            $scope.sourceUserSelection2 = null;

        };


        $scope.btAjouterPersonSourceClick = function () {

            if ($scope.source.relationPerson === undefined) {
                $scope.source.relationPerson = new Array();
            }

            if (typeof $scope.auteurUserSelection2 === 'string') {
                $scope.source.relationPerson.push(
                            {
                                source: {id: $scope.source.id},
                                person: {
                                    label:$scope.auteurUserSelection2
                                },
                                rolePublication: $scope.auteurUserSelectionRolePublication
                            }
                    );
            }
            else {
                var i = $scope.source.relationPerson.length;
                present = false;
                while (i--) {
                    if ($scope.source.relationPerson[i].id === $scope.auteurUserSelection2.id) {
                        present = true;
                    }
                }
                if (!present) {
                    $scope.source.relationPerson.push(
                            {
                                source: {id: $scope.source.id},
                                person: $scope.auteurUserSelection2,
                                rolePublication: $scope.auteurUserSelectionRolePublication
                            }
                    );
                }
            }


            $scope.sourceUserSelection2 = null;
        }

        $scope.removeRelationSourcePersonClick = function (id) {
     
            array = $scope.source.relationPerson;
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i].person.id === id) {
                    array.splice(i, 1);
                }
            }
        }


        $scope.removeAuthorClick = function (id) {
            array = $scope.source.authors;
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i].id === id) {
                    array.splice(i, 1);
                }
            }
        }


        $scope.confirmForm = function (action) {
            if (action === ACTION_EDIT) {
                SourceFactory.update({'id': $scope.source.id}, $scope.source).$promise.then(function () {
                    $location.path('/source');
                });
            }
            else if (action === ACTION_CREATE) {
                SourceFactory.create($scope.source).$promise.then(function () {
                    $location.path('/source');
                });
            }
        };
    }]);



//=======================================================================================
//                          VIEW CONTROLE
//=======================================================================================


workCtrl.controller('sourceViewCtrl', ['$scope', '$rootScope', 'SourceFactory', '$location', '$routeParams', '$http', function ($scope, $rootScope, SourceFactory, $location, $routeParams, $http) {

        $http.get($rootScope.webservice + '/rest/source?id=' + $routeParams.sourceId).success(function (data) {
            $scope.source = data;
        });

        $scope.edit = function (id) {
            $location.path('/source-edit/' + id);
        }

        $scope.delete = function (userId) {
            SourceFactory.delete({id: userId}).$promise.then(function () {
                $scope.sources = SourceFactory.query();
                $location.path('/source');
            });
        }
    }
]
        );
