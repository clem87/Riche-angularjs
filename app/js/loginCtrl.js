/* 
 * Service chargé du login et du logout
 */
var loginCtrlModule = angular.module('loginCtrlModule', []);

loginCtrlModule.controller('loginCtrl',
        ['$rootScope', '$scope', '$http', '$location', '$cookies', '$timeout', '$browser', function
                    ($rootScope, $scope, $http, $location, $cookies, $timeout, $browser) {

                    /***
                     * En fonction de la valeur de authenticated on modifi le text du bouton
                     */
                $scope.$watch('authenticated', function () {
                    if ($rootScope.authenticated) {
                        $scope.buttonTxt = "Déconnexion";
                    }
                    else {
                        $scope.buttonTxt = "Connexion";
                    }
                });
                
                /***
                 * Lors du click sur le bouton verif $rootScope.authenticated logout et redirection
                 * @returns {undefined}
                 */
                $scope.loginClick = function(){
                    if ($rootScope.authenticated) {
                        $scope.logout();
                    }
                    else{
                        $location.path('login');
                    }
                }


                var authenticate = function (credentials, callback) {

                    if (credentials !== undefined) {
                        var req = {
                            method: 'POST',
                            url: $rootScope.webservice + '/j_spring_security_check',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': 'application/json'
                            },
                            withCredentials: true,
                            async: true,
                            data: "j_username=" + credentials.j_username + "&j_password=" + credentials.j_password};


                        $http(req).then(
                                function (data, status, header) {
                                    $rootScope.authenticated = true;
                                    $scope.buttonTxt = "Logout";
                                    callback && callback();

                                },
                                function () {
                                    $rootScope.authenticated = false;
                                    alert("fail");
                                    callback && callback();
                                });
                    }
                };

                authenticate();

                $scope.credentials = {};
                $scope.login = function () {
                    authenticate($scope.credentials, function () {
                        if ($rootScope.authenticated) {
                            $location.path("/");
                            $scope.error = false;
                        } else {
                            $location.path("/login");
                            $scope.error = true;
                        }
                    }
                    );
                };

                $scope.logout = function () {
                    $rootScope.authenticated = false;

                    var req = {
                        method: 'GET',
                        url: $rootScope.webservice + '/j_spring_security_logout',
                        withCredentials: true,
                        async: true,
                    };


                    $http(req).then(
                            function (data, status, header) {
                                $rootScope.authenticated = false;
                                $scope.buttonTxt = "Login";
                            },
                            function () {
                                alert("fail");
                            });
                };
            }
        ]
        );
