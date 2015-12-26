/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

//var richeApp = angular.module('richeApp', []);
var workCtrl = angular.module('workCtrl', []);

// ======================================= LIST CONTROLER===================================

workCtrl.controller('workListCtrl', ['$scope', 'WorkFactory', '$location', '$http', '$rootScope', '$filter', function ($scope, WorkFactory, $location, $http, $rootScope, $filter) {

        WorkFactory.query().$promise.then(function (result) {
            $scope.works = result;
            $scope.currentPage = 1;
        });
        
        $scope.isSearchCollapsed=true;
       $scope.searchButtonTitle="Recherche Avancée";
        
        
        $scope.clickSearchCollapsed = function(){
           $scope.isSearchCollapsed = !$scope.isSearchCollapsed;
           
           
           if($scope.isSearchCollapsed){
                $scope.searchButtonTitle="Recherche Avancée";

           }
           else{
                              $scope.searchButtonTitle="Masquer recherche avancée";
           }
        }


//Chargement du total d'item en base
        $http.get($rootScope.webservice + '/rest/work/getallcount').success(function (data) {
            $scope.totalItemsInDB = data;
        });

//Chargement de la liste des thèmes
        $http.get($rootScope.webservice + '/rest/theme/getall').success(function (data) {
            $scope.themedispo = data;
        });

        if ($rootScope.workOrderProp !== 'undefinded') {
            $scope.workOrderPropSelection = $rootScope.workOrderProp;
        }

        $scope.numPerPage = 10;

        $scope.$watch('currentPage + numPerPage', function () {
            reload();
        });

        /***
         * Recharge les la liste d'oeuvre a afficher en fonction des critère de recherche et de la pagination
         * @returns {undefined}
         */
        function reload() {
//            $scope.totalItems = $scope.works.length;
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;

            $scope.filteredWorks = $scope.works;
            /***
             * pour les autheur il faut trier en fonction du premier auteur (attention c'est un tableau on fait une fonction spécifique
             */
            if ($rootScope.workOrderProp === 'author') {
                $scope.filteredWorks = $filter('orderBy')($scope.filteredWorks, function (a) {
                    if (a.authors.length === 0) {
                        return "ZZZ";
                    }
                    else {
                        return a.authors[0].label
                    }
                }, false);
            } else {
                $scope.filteredWorks = $filter('orderBy')($scope.filteredWorks, $rootScope.workOrderProp, false);
            }
            $scope.filteredWorks = $filter('filter')($scope.filteredWorks, $rootScope.workQuery);


            $scope.totalItems = $scope.filteredWorks.length;
            $scope.filteredWorks = $scope.filteredWorks.slice(begin, end);
        }

        $scope.addSearchFilter = function () {
            $rootScope.workQuery = $scope.userSelectionquery;
//            $scope.query = $scope.userSelectionquery;
            reload();
        }

        $scope.workOrderPropChange = function () {
//            alert("chrg");
            $rootScope.workOrderProp = $scope.workOrderPropSelection;
            reload();
        }

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
        };


        $scope.delete = function (userId) {
            alert("aa")
            if (confirm("Confirmez vous la suppression ?")) {
                WorkFactory.delete({id: userId}).$promise.then(function (result) {
                    $scope.works = WorkFactory.query().$promise.then(function (result) {
                        $scope.works = result;
//                    $scope.currentPage = 1;
                        reload();
                    });
                    ;
                }).then(function () {
                    $location.path('/work');
                })

            }
        };

        $scope.edit = function (userid) {
            $location.path('/work-edit/' + userid);
        };

        $scope.createNewUser = function () {
            $location.path('/work-create');
        };

        $scope.viewWork = function (userId) {
            $location.path('/work-view/' + userId);
        };

        /** 
         * Ajoute un critere de recherche
         * @returns {undefined}
         */
        $scope.addSearchCriteria = function () {
            if ($scope.searchCriteriaWorkForm.$valid) {
                if ($scope.searchCriterias === undefined) {
                    $scope.searchCriterias = new Array();
                }
                $scope.searchCriterias.push({
                    field: $scope.searchCriteria.field,
                    operator: $scope.searchCriteria.operator,
                    value: $scope.searchCriteria.value
                });
                $scope.searchCriteria.field = null;
                $scope.searchCriteria.operator = null;
                $scope.searchCriteria.value = null;
            }
        };

        $scope.search = function () {
            WorkFactory.search({}, {searchCriteria: $scope.searchCriterias}).$promise.then(function (data) {
                $scope.works = data;
                reload();
            });
        }

        /***
         * Supprime le criteria de recherche de la liste
         * @param {type} criteriaToremove
         * @returns {undefined}
         */
        $scope.removeSearchCriteria = function (criteriaToremove) {
            var index = $scope.searchCriterias.indexOf(criteriaToremove);
            if (index !== -1) {
                $scope.searchCriterias.splice(index, 1);
            }
        };

    }]
        );

// =======================================CREATE CONTROLER===================================

workCtrl.controller('workCreateCtrl', ['$scope', '$rootScope', 'WorkFactory', 'PersonFactory', 'SourceFactory', '$location', '$routeParams', '$http', '$modal', function ($scope, $rootScope, WorkFactory, PersonFactory, SourceFactory, $location, $routeParams, $http, $modal) {

        // Chargement deds première instruction pour edit et create. 
        if ($location.path() === '/work-create/') {

            initWorkIfNeed();
        }
        else if (/^\/work-edit\//.test($location.path())) {
            $http.get($rootScope.webservice + '/rest/work/get?id=' + $routeParams.workId).success(function (data) {
                $scope.work = data;
            });
        }

        $http.get($rootScope.webservice + '/rest/theme/getall').success(function (data) {
            $scope.themedispo = data;
        });
        $http.get($rootScope.webservice + '/rest/origine/getall').success(function (data) {
            $scope.origindispo = data;
        });


        $scope.setFormScope = function (f) {
            $scope.form = f;
        }

        $scope.getAuteurCompletion = function (userString) {
            return $http.get($rootScope.webservice + '/rest/workauthor/find?userselection=' + userString).success(
                    function (data) {

                    }).then(function (resp) {

                return resp.data;
            })

        }

        $scope.getThemeCompletion = function (userString) {
            return $http.get($rootScope.webservice + '/rest/theme/find?userselection=' + userString).success(
                    function (data) {

                    }).then(function (resp) {

                return resp.data;
            })

        }

        $scope.confirmForm = function (action) {
            if ($scope.form.form.$valid) {
                if (action === ACTION_EDIT) {
                    WorkFactory.update({'id': $scope.work.id}, $scope.work).$promise.then(function () {
                        $location.path('/work');
                    }, function (reason) {
                        alert("Errreur lors de : l'enregistrement");
                    });

                }
                else if (action === ACTION_CREATE) {


                    WorkFactory.create($scope.work).$promise.then(function () {
                        $location.path('/work');
                    }, function (reason) {
                        alert("Errreur lors de : l'enregistrement");
                    });
                }
            }
            else {
                alert("Verrifier les valeurs saisies");
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

        $scope.testme = function () {
            alert('testme');
        }



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


        /***
         * Permet de gérer la frappe entrer de l'utilisateur sur l'input text de recherche des sources.
         * @param {type} keyEvent
         * @returns {undefined}
         */
        $scope.sourceKeyPressWithEnter = function (keyEvent) {

//            if (keyEvent.which === 13) {
//                if ($scope.work.sources === undefined) {
//                    $scope.work.sources = new Array();
//                }
//                if (typeof $scope.sourceUserSelection === 'object') {
//                    var i = $scope.work.sources.length;
//                    present = false;
//                    while (i--) {
//                        if ($scope.work.sources[i].id === $scope.sourceUserSelection.id) {
//                            present = true;
//                        }
//                    }
//                    if (!present) {
//                        $scope.work.sources.push($scope.sourceUserSelection);
//                    }
//                    $scope.sourceUserSelection = null;
//                }
//                else if (typeof $scope.sourceUserSelection === 'string') {
//                    alert('veuillez créer la source')
//                }
//                ;
//            }
        };

        $scope.sourceBtAjouterClick = function () {
            if ($scope.work.relationWorkSource === undefined) {
                $scope.work.relationWorkSource = new Array();
            }
            if (typeof $scope.sourceUserSelection === 'object') {
                var i = $scope.work.relationWorkSource.length;
                present = false;
                while (i--) {
                    if ($scope.work.relationWorkSource[i].source.id === $scope.sourceUserSelection.id) {
                        present = true;
                    }
                }

//                workcopie = JSON.parse(JSON.stringify($scope.work));
//                workcopie.relationWorkSource=null;
                if (!present) {

                    $scope.work.relationWorkSource.push({
                        "source": {id: $scope.sourceUserSelection.id},
                        "extract": $scope.sourceExtractUserSelection,
                        "tome": $scope.sourceExtractUserSelection,
                        "nature": $scope.sourceNatureUserSelection,
                        "workEntity": {id: $scope.work.id}
                    });

                }
//                $scope.sourceUserSelection = null;
            }
        }


        $scope.authorUserSelection = function ($item, $model, $label) {
            if ($scope.work.authors === undefined) {
                $scope.work.authors = new Array();
            }

            var i = $scope.work.authors.length;
            present = false;
            while (i--) {
                if ($scope.work.authors[i].id === $item.id) {
                    present = true;
                }
            }
            if (!present) {
                $scope.work.authors.push($item);
            }

            $scope.sourceUserSelection = null;

        };


        $scope.themeUserSelection = function ($item, $model, $label) {
            if ($scope.work.theme === undefined) {
                $scope.work.theme = new Array();
            }

            var i = $scope.work.theme.length;
            present = false;
            while (i--) {
                if ($scope.work.theme[i].id === $item.id) {
                    present = true;
                }
            }
            if (!present) {
                $scope.work.theme.push($item);
            }
            $scope.currentThemeUserSelection = null;
        };


        $scope.onSelectsourceUserSelection = function ($item, $model, $label) {

        };

        $scope.removeSourceClick = function (id) {
            array = $scope.work.relationWorkSource;
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i].id === id) {
                    array.splice(i, 1);
                }
            }
        }

        $scope.removeAuthorClick = function (id) {
            array = $scope.work.authors;
            for (var i = array.length - 1; i >= 0; i--) {
                if (array[i].id === id) {
                    array.splice(i, 1);
                }
            }
        }

        $scope.getStates = function (truc) {
            return $http.get($rootScope.webservice + '/rest/source/find?userselection=' + truc).success(
                    function (data) {

                    }).then(function (resp) {

                return resp.data;
            })
        };

        $scope.selected = undefined;
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        // Any function returning a promise object can be used to load values asynchronously
        $scope.getLocation = function (val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false
                }
            }).then(function (response) {
                return response.data.results.map(function (item) {
                    return item.formatted_address;
                });
            });
        };

        $scope.statesWithFlags = [{'name': 'Alabama', 'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'}, {'name': 'Alaska', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'}, {'name': 'Arizona', 'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'}, {'name': 'Arkansas', 'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'}, {'name': 'California', 'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'}, {'name': 'Colorado', 'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'}, {'name': 'Connecticut', 'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'}, {'name': 'Delaware', 'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'}, {'name': 'Florida', 'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'}, {'name': 'Georgia', 'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'}, {'name': 'Hawaii', 'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'}, {'name': 'Idaho', 'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'}, {'name': 'Illinois', 'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'}, {'name': 'Indiana', 'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'}, {'name': 'Iowa', 'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'}, {'name': 'Kansas', 'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'}, {'name': 'Kentucky', 'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'}, {'name': 'Louisiana', 'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'}, {'name': 'Maine', 'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'}, {'name': 'Maryland', 'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'}, {'name': 'Massachusetts', 'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'}, {'name': 'Michigan', 'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'}, {'name': 'Minnesota', 'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'}, {'name': 'Mississippi', 'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'}, {'name': 'Missouri', 'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'}, {'name': 'Montana', 'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'}, {'name': 'Nebraska', 'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'}, {'name': 'Nevada', 'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'}, {'name': 'New Hampshire', 'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'}, {'name': 'New Jersey', 'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'}, {'name': 'New Mexico', 'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'}, {'name': 'New York', 'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'}, {'name': 'North Carolina', 'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'}, {'name': 'North Dakota', 'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'}, {'name': 'Ohio', 'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'}, {'name': 'Oklahoma', 'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'}, {'name': 'Oregon', 'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'}, {'name': 'Pennsylvania', 'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'}, {'name': 'Rhode Island', 'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'}, {'name': 'South Carolina', 'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'}, {'name': 'South Dakota', 'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'}, {'name': 'Tennessee', 'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'}, {'name': 'Texas', 'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'}, {'name': 'Utah', 'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'}, {'name': 'Vermont', 'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'}, {'name': 'Virginia', 'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'}, {'name': 'Washington', 'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'}, {'name': 'West Virginia', 'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'}, {'name': 'Wisconsin', 'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'}, {'name': 'Wyoming', 'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];
    }]);


// =======================================VIEW CONTROLER===================================
workCtrl.controller('workViewCtrl', ['$scope', '$rootScope', 'WorkFactory', '$location', '$routeParams', '$http', function ($scope, $rootScope, WorkFactory, $location, $routeParams, $http) {

        $http.get($rootScope.webservice + '/rest/work/get?id=' + $routeParams.workId).success(function (data) {
            $scope.work = data;
        });

        $scope.back = function () {
            $location.path('/work');
        };
    }
]
        );
