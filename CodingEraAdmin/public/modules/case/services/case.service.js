/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('case').factory('CaseService', [ '$log','ceAjax',
    function($log,ceAjax) {

        var service ={};

        service.saveCase = function(parameters){
            return ceAjax.post({url:'/case', data:parameters});
        };

        service.getCases = function(parameters){
            return ceAjax.get({url:'/case/list',data:parameters});
        };

        service.deleteCase = function(parameters){
            return ceAjax.delete({url:'/case',data:parameters});
        };

        return service;
    }
]);