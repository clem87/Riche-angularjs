/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//var richeApp = angular.module('richeApp', []);
var workCtrl = angular.module('workCtrl', []);

workCtrl.controller('workListCtrl', ['$scope', 'WorkFactory', '$location', '$http', '$rootScope', function ($scope, WorkFactory, $location, $http, $rootScope) {



        $scope.deleteWork = function (userId) {
            WorkFactory.delete({id: userId}).$promise.then(function (result) {
                $scope.works = WorkFactory.query();
            }).then(function () {
                $location.path('/work');
            });
        };

        $scope.editWork = function (userid) {
            $location.path('/work-edit/' + userid);
        };

        $scope.createNewUser = function () {
            $location.path('/work-create');
        };

        $scope.viewWork = function (userId) {
            $location.path('/work-view/' + userId);
        };

        $scope.works = WorkFactory.query();

    }]
        );


// =======================================CREATE CONTROLER===================================

workCtrl.controller('workCreateCtrl', ['$scope', '$rootScope', 'WorkFactory', 'PersonFactory', '$location', '$routeParams', '$http', function ($scope, $rootScope, WorkFactory, PersonFactory, $location, $routeParams, $http) {

        // Chargement deds première instruction pour edit et create. 
        if ($location.path() === '/work-create/') {

            initWorkIfNeed();
        }
        else if (/^\/work-edit\//.test($location.path())) {
            $http.get($rootScope.webservice + '/rest/test?id=' + $routeParams.workId).success(function (data) {
                $scope.work = data;
            });
        }

        /***
         * Confirm form. action are different for edit and create
         * @param {type} action edit or create
         * @returns {undefined}
         */
//        $scope.confirmForm = function (action) {
//            if (action === 'edit') {
//                WorkFactory.update({'id': $scope.work.id}, $scope.work);
//            }
//            else if (action === 'create') {
//                WorkFactory.create($scope.work);
//                $location.path('/work');
//            }
//        };


//        // callback for ng-click 'createNewUser':
//        $scope.confirmCreation = function () {
//            WorkFactory.create($scope.work);
//            $location.path('/work');
//        };

        $scope.confirmForm = function (action) {
            if (action===ACTION_EDIT) {
                WorkFactory.update({'id': $scope.work.id}, $scope.work);
                $location.path('/work');
            }
            else if (action===ACTION_CREATE) {
                WorkFactory.create($scope.work);
                $location.path('/work');
            }
        };

        //callback for back to work list
        $scope.back = function () {
            $location.path('/work');
        };



        function initWorkIfNeed() {
            if ($scope.work === undefined) {
                $scope.work = {
                    'id': null,
                    'authors': new Array()
                };
            }
        }

        funcSelectAuthorInList = function selectAuthorInList() {
            initWorkIfNeed();

            tab = $scope.work.authors;
            if (tab === undefined) {
                tab = new Array();
            }
            tab.push($scope.selectedAuthor);
            $scope.work.authors = tab;
        };


        $scope.selectAuthorInList = funcSelectAuthorInList;

        $scope.removeAuthorInList = function (author) {

            tab = $scope.work.authors;
            i = 0;
            newArray = new Array();
            for (i = 0; i < tab.length; i++) {
                tmpauthor = tab[i];
                if (tmpauthor['id'] !== author['id']) {
                    newArray.push(tmpauthor);
                }
            }
            $scope.work.authors = newArray;
        };

        $scope.keyPressWithEnter = function (keyEvent) {
            if (keyEvent.which === 13) {

                newPerson = {
                    id: null,
                    label: $scope.userselection.keyboardname
                };
                $scope.selectedAuthor = newPerson;
                funcSelectAuthorInList();

            }
            else {
                $scope.existingAuthors = PersonFactory.find({userselection: $scope.userselection.keyboardname});
            }
        };
    }]);

// =======================================MODIFY CONTROLER===================================

workCtrl.controller('workModifyCtrl', ['$scope', '$rootScope', 'WorkFactory', 'PersonFactory', '$location', '$routeParams', '$http', function ($scope, $rootScope, WorkFactory, PersonFactory, $location, $routeParams, $http) {

        $http.get($rootScope.webservice + '/rest/test?id=' + $routeParams.workId).success(function (data) {
            $scope.work = data;
        });

        $scope.confirm = function (action) {
            if (action === 'edit') {
                WorkFactory.update({'id': $scope.work.id}, $scope.work);
            }
            else if (action === 'create') {
                alerte('create');
            }

        };

        $scope.back = function () {
            $location.path('/work');
        };


    }
]
        );

// =======================================VIEW CONTROLER===================================
workCtrl.controller('workViewCtrl', ['$scope', '$rootScope', 'WorkFactory', '$location', '$routeParams', '$http', function ($scope, $rootScope, WorkFactory, $location, $routeParams, $http) {

        $http.get($rootScope.webservice + '/rest/test?id=' + $routeParams.workId).success(function (data) {
            $scope.work = data;
        });

        $scope.back = function () {
            $location.path('/work');
        };
    }
]
        );