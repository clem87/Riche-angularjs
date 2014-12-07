/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var sourceCtrl = angular.module('sourceCtrl', []);


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


sourceCtrl.controller('sourceCreateCtrl', ['$scope', 'SourceFactory', '$location', '$http', '$rootScope', '$routeParams', function ($scope, SourceFactory, $location, $http, $rootScope, $routeParams) {
        // Chargement deds première instruction pour edit et create. 
        if ($location.path() === '/source-create') {
//            initWorkIfNeed();
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




        $scope.back = function () {
            $location.path('/source');
        };


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

