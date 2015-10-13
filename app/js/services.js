/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var workServices = angular.module('workServices', ['ngResource']);

workServices.factory('ArticleFactory', ['$resource', '$rootScope', function ($resource, $rootScope) {
        return $resource($rootScope.webservice + '/rest/article/', {}, {
            delete: {method: 'DELETE', params: {id: '@id'}, url: $rootScope.webservice + 'rest/article/delete', withCredentials: true, async: true},
            query: {method: 'GET', isArray: true, header: 'application/json', url: $rootScope.webservice + 'rest/article/getall',withCredentials: true},
            find: {method: 'GET', param: {userselection: 'userselection'}, isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/article/find'},
            create: {method: 'PUT', header: 'application/json', url: $rootScope.webservice + 'rest/article/put', withCredentials: true, async: true},
            update: {method: 'POST', header: 'application/json', url: $rootScope.webservice + "rest/article/post", params: {id: '\n\
', withCredentials: true, async: true}}
        });
    }]);


workServices.factory('WorkFactory', ['$resource', '$rootScope',
    function ($resource, $rootScope) {
        return $resource($rootScope.webservice + '/rest/work/', {}, {
            query: {method: 'GET', isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/work/getall',  withCredentials: true, async: true},
            create: {method: 'PUT',
                 headers:{'Accept': 'application/json'},
                url: $rootScope.webservice + '/rest/work/put',  
                withCredentials: true,
                async: false},
            delete: {method: 'DELETE', params: {id: '@id'}, url: $rootScope.webservice + 'rest/work/delete',  withCredentials: true, async: true},
//            get: {method: 'GET', header: 'application/json', url:"http://192.168.0.11:8084/springnb/rest/test", params: {id: 6}},
            update: {method: 'POST', header: 'application/json', url: $rootScope.webservice + "/rest/work/post", params: {id: '\n\
',  withCredentials: true, async: true}}
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
            delete: {method: 'DELETE', params: {id: '@id'}, url: $rootScope.webservice + "/rest/source/delete"},
            query: {method: 'GET', isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/source/getall', withCredentials: true, async: true},
            find: {method: 'GET', param: {userselection: 'userselection'}, isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/source/find'},
            create: {method: 'PUT', header: 'application/json', url: $rootScope.webservice + '/rest/source/put',  withCredentials: true, async: true},
            update: {method: 'POST', header: 'application/json', url: $rootScope.webservice + "/rest/source/post", params: {id: '\n\
'},  withCredentials: true, async: true}
        });
    }]);



workServices.factory('PersonFactory', ['$resource', '$rootScope', function ($resource, $rootScope) {
        return $resource($rootScope.webservice + '/rest/author/', {}, {
            delete: {method: 'DELETE', params: {id: '@id'}, url: $rootScope.webservice + 'rest/author/delete', withCredentials: true, async: true},
            query: {method: 'GET', isArray: true, header: 'application/json', url: $rootScope.webservice + 'rest/author/getall', withCredentials: true, async: true},
            find: {method: 'GET', param: {userselection: 'userselection'}, isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/source/find'},
            create: {method: 'PUT', header: 'application/json', url: $rootScope.webservice + 'rest/author/put',  withCredentials: true, async: true},
            createScientifique: {method: 'POST', header: 'application/json', url: $rootScope.webservice + '/rest/author/addScientifique'},
            update: {method: 'POST', header: 'application/json', url: $rootScope.webservice + "rest/author/post", params: {id: '\n\
'}}
        });
    }]);

workServices.factory('WorkauthorFactory', ['$resource', '$rootScope', function ($resource, $rootScope) {
        return $resource($rootScope.webservice + '/rest/workauthor/', {}, {
            delete: {method: 'DELETE', params: {id: '@id'}, url: $rootScope.webservice + 'rest/workauthor/delete', withCredentials: true, async: true},
            query: {method: 'GET', isArray: true, header: 'application/json', url: $rootScope.webservice + 'rest/workauthor/getall',withCredentials: true, async: true},
            find: {method: 'GET', param: {userselection: 'userselection'}, isArray: true, header: 'application/json', url: $rootScope.webservice + '/rest/workauthor/find'},
            create: {method: 'PUT', header: 'application/json', url: $rootScope.webservice + 'rest/workauthor/put', withCredentials: true, async: true},
//                       createScientifique:{method: 'POST', header: 'application/json', url: $rootScope.webservice + '/rest/author/addScientifique'},
            update: {method: 'POST', header: 'application/json', url: $rootScope.webservice + "rest/workauthor/post", params: {id: '\n\
', withCredentials: true, async: true}}
        });
    }]);

workServices.factory('userService', ['$rootScope', '$http', function ($rootScope, $http) {
        
}]);




