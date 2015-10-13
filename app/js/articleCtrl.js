/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var articleCtrl = angular.module('articleCtrl', []);

//================================================================================
//                  CONTROLEUR LIST
//================================================================================
articleCtrl.controller('articleCtrlList',
        ['$scope', 'ArticleFactory', '$location', '$http', '$rootScope', function
                    ($scope, ArticleFactory, $location, $http, $rootScope) {



                $http.get($rootScope.webservice + '/rest/article/get?id=1').success(function (data) {
                    $scope.mainArticle = data;
                });
//                        $scope.myarticles = ArticleFactory.query();
                ;


                $scope.edit = function (id) {
                    $location.path('/article-edit/1');
                }


            }
        ]);



//================================================================================
//                  CONTROLEUR EDIT
//================================================================================


workauthorCtrl.controller('articleCtrlEdit',
        ['$scope', 'ArticleFactory', '$location', '$http', '$rootScope', '$routeParams',
            function ($scope, ArticleFactory, $location, $http, $rootScope, $routeParams) {

                /***
                 * Récupération de l'article principal
                 */
                $http.get($rootScope.webservice + '/rest/article/get?id='+$routeParams.articleId).success(function (data) {
                    $scope.article = data;
                });
       


                $scope.confirmForm = function (action) {
                    if (action === ACTION_EDIT) {
                        alert("EDITION " + $scope.article.id + " "+$scope.article)
                        ArticleFactory.update({'id': $scope.article.id}, $scope.article).$promise.then(function () {
                            $location.path('/home');
                        });
                    }
                    else if (action === ACTION_CREATE) {
                        ArticleFactory.create($scope.article).$promise.then(function () {
                            $location.path('/source');
                        });
                    }
                };

            }]);