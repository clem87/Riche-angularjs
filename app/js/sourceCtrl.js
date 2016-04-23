/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var sourceCtrl = angular.module('sourceCtrl', []);


//=======================================================================================
////                LISTE CONTROLE
//=======================================================================================


sourceCtrl.controller('sourceListCtrl', ['$scope', 'SourceFactory', '$location', '$http', '$rootScope', '$filter', 'dataServiceSource',function ($scope, SourceFactory, $location, $http, $rootScope, $filter, dataServiceSource) {

   $scope.data = dataServiceSource;
   
   $scope.loading = false;
   if($scope.data.sources=== null){
       $scope.loading = true;
            SourceFactory.query().$promise.then(function (result) {
            $scope.data.currentPage = 1;
            $scope.data.sources = result;
            $scope.reloadTotalItemsInDB();
            reloadListView();
            $scope.loading = false;
        });
   }
   
        $scope.reloadTotalItemsInDB = function () {
            $http.get($rootScope.webservice + '/rest/source/getallcount').success(function (data) {
                $scope.data.totalItemsInDB = data;
            });
        }
   
        
        //Chargement du total d'item en base

        $scope.numPerPage = 10;

        $scope.create = function () {
            $location.path('/source-create');
        };

        $scope.delete = function (userId) {
            if (confirm("Confirmez vous la suppression ?")) {
               SourceFactory.delete({id: userId}).$promise.then(function () {
                   
                   for (var i = 0; i < dataServiceSource.sources.length; i++) {
                       if(dataServiceSource.sources[i].id === userId){
                          dataServiceSource.sources.splice(i,1); 
                            break;
                       }
                   }
                   $scope.reloadTotalItemsInDB();
                   reloadListView();
                })
                .then(function () {
                $location.path('/source');
            });
            }
        }

        $scope.edit = function (id) {
            $location.path('/source-edit/' + id);
        }

        $scope.back = function () {
            $location.path('/source');
        };

        $scope.addSearchFilter = function () {
            $rootScope.sourceQuery = $scope.sourceQueryUserSelection;
            reloadListView();
        }


        $scope.$watch('data.currentPage + numPerPage', function () {
            reloadListView();
        });

        function reloadListView() {
            var begin = (($scope.data.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;
            $scope.filteredSources = $scope.data.sources;
            $scope.filteredSources = $filter('filter')($scope.filteredSources, $rootScope.sourceQuery);
            $scope.totalItems = $scope.filteredSources.length;
            $scope.filteredSources = $scope.filteredSources.slice(begin, end);
        }

    }]);


//=======================================================================================
//                                      CREATE & EDIT CONTROLE
//=======================================================================================

sourceCtrl.controller('sourceCreateCtrl', ['$scope', 'SourceFactory', '$location', '$http', '$rootScope', '$routeParams', 'dataServiceSource',function ($scope, SourceFactory, $location, $http, $rootScope, $routeParams, dataServiceSource) {
        
        $scope.data = dataServiceSource;
        
        // Chargement deds première instruction pour edit et create. 
        if ($location.path() === '/source-create') {
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
                                label: $scope.auteurUserSelection2
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
                    changeOrAddSourceInList($scope.source);
                    $location.path('/source');
                });
            }
            else if (action === ACTION_CREATE) {
                SourceFactory.create($scope.source).$promise.then(function () {
                    changeOrAddSourceInList($scope.source)
                    $location.path('/source');
                });
            }
            $scope.reloadTotalItemsInDB();
        };
        
        function changeOrAddSourceInList(source) {
            for (var i = 0; i < dataServiceSource.sources.length; i++) {
                itWork = dataServiceSource.sources[i];

                if (itWork.id === source.id) {
                    dataServiceSource.sources[i] = source;
                    return ;
                }
            }
            dataServiceSource.sources.push(source);
        }
    }]);



//=======================================================================================
//                          VIEW CONTROLE
//=======================================================================================


workCtrl.controller('sourceViewCtrl', ['$scope', '$rootScope', 'SourceFactory', '$location', '$routeParams', '$http', function ($scope, $rootScope, SourceFactory, $location, $routeParams, $http) {

        $http.get($rootScope.webservice + '/rest/source?id=' + $routeParams.sourceId).success(function (data) {
            $scope.source = data;
        });
    }
]
        );
