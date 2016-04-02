/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('dynamic').factory('DynamicService', [ '$log','ceAjax',
    function($log,ceAjax) {

        var service ={};

        service.getDynamicById = function(id){
            return ceAjax.get({url:'/dynamic/'+id});
        };



        service.getDynamics = function(parameters){
            return ceAjax.get({url:'/dynamic/list',data:parameters});
        };



        service.save = function(parameters){
            return ceAjax.post({url:'/dynamic', data:parameters});
        };

        service.deleteDynamic = function(parameters){
            return ceAjax.delete({url:'/dynamic',data:parameters});
        };

        return service;
    }
]);