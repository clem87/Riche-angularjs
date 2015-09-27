/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var workServices = angular.module('workServices', ['ngResource']);

workServices.factory('WorkFactory', ['$resource', '$rootScope',
    function ($resource, $rootScope) {
        return $resource($rootScope.webservice + '/rest/work/', {}, {
            query: {method: 'GET', isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/work/getall'},
            create: {method: 'POST', header: 'application/json', url: $rootScope.webservice + 'rest/work/add'},
            delete: {method: 'DELETE', params: {id: '@id'}},
//            get: {method: 'GET', header: 'application/json', url:"http://192.168.0.11:8084/springnb/rest/test", params: {id: 6}},
            update: {method: 'PUT', header: 'application/json', url: $rootScope.webservice + "/rest/work", params: {id: '\n\
'}}
        });
    }]);


workServices.factory('PersonFactory', ['$resource', '$rootScope',
    function ($resource, $rootScope) {

        return $resource($rootScope.webservice + '/rest/author/', {}, {
            find: {method: 'GET', param: {userselection: 'userselection'}, isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/author/find'},
            createScientifique: {method: 'POST', header: 'application/json', url: $rootScope.webservice + '/rest/source/addScientifique'}
        });
    }]
        );

workServices.factory('SourceFactory', ['$resource', '$rootScope',
    function ($resource, $rootScope) {
        return $resource($rootScope.webservice + '/rest/source/', {}, {
            delete: {method: 'DELETE', params: {id: '@id'}},
            query: {method: 'GET', isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/source/getall'},
            find: {method: 'GET', param: {userselection: 'userselection'}, isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/source/find'},
            create: {method: 'POST', header: 'application/json', url: $rootScope.webservice + '/rest/source/add'},
            update: {method: 'PUT', header: 'application/json', url: $rootScope.webservice + "/rest/source", params: {id: '\n\
'}},
        });
    }

])


workServices.factory('PersonFactory', ['$resource', '$rootScope', function ($resource, $rootScope) {
        return $resource($rootScope.webservice + '/rest/author/', {}, {
            delete: {method: 'DELETE', params: {id: '@id'}},
            query: {method: 'GET', isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/author/getall'},
            find: {method: 'GET', param: {userselection: 'userselection'}, isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/source/find'},
            create: {method: 'POST', header: 'application/json', url: $rootScope.webservice + '/rest/author/add'},
            createScientifique: {method: 'POST', header: 'application/json', url: $rootScope.webservice + '/rest/author/addScientifique'},
            update: {method: 'PUT', header: 'application/json', url: $rootScope.webservice + "/rest/author", params: {id: '\n\
'}}
        });
    }]);

workServices.factory('WorkauthorFactory', ['$resource', '$rootScope', function ($resource, $rootScope) {
        

        return $resource($rootScope.webservice + '/rest/workauthor/', {}, {
            delete: {method: 'DELETE', params: {id: '@id'}},
            query: {method: 'GET', isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/workauthor/getall'},
            find: {method: 'GET', param: {userselection: 'userselection'}, isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/workauthor/find'},
            create: {method: 'POST', header: 'application/json', url: $rootScope.webservice + '/rest/workauthor/add'},
//                       createScientifique:{method: 'POST', header: 'application/json', url: $rootScope.webservice + '/rest/author/addScientifique'},
            update: {method: 'PUT', header: 'application/json', url: $rootScope.webservice + "/rest/workauthor", params: {id: '\n\
'}}
        });
    }]);




workServices.factory('userService', ['$rootScope', '$http', function ($rootScope, $http) {
        
}]);




