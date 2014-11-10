/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var workServices = angular.module('workServices', ['ngResource']);

workServices.factory('WorkFactory', ['$resource','$rootScope',
    function ($resource, $rootScope) {
        



        return $resource($rootScope.webservice+'/rest/test/', {}, {

            
            query: {method: 'GET', isArray: true, header: 'application/json', url: $rootScope.webservice+'/rest/test/getall'},
            create: {method: 'POST', header: 'application/json', url: $rootScope.webservice+'/rest/test/add'},
            delete: {method: 'DELETE', params: {id: '@id'}},
//            get: {method: 'GET', header: 'application/json', url:"http://192.168.0.11:8084/springnb/rest/test", params: {id: 6}},
            update: {method: 'PUT', header: 'application/json', url: $rootScope.webservice+"/rest/test", params: {id: '\n\
'}}
        });
    }]);


//var personServices = angular.module('personServices', ['ngResource']);
workServices.factory('PersonFactory', ['$resource','$rootScope',
    function ($resource, $rootScope) {

        return $resource($rootScope.webservice+'/rest/author/', {}, {
            find: {method: 'GET', param:{userselection: 'userselection'}, isArray: true, header: 'application/json', url: $rootScope.webservice+'/rest/author/find'}
        });
    }]
        );
