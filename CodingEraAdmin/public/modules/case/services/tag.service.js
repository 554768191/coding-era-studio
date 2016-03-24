/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('case').factory('TagService', [ '$log','ceAjax',
    function($log,ceAjax) {

        var service ={};

        service.getTags = function(parameters){
            return ceAjax.get({url:'/tag',data:parameters});
        };

        service.getAllTags = function(){
            return ceAjax.get({url:'/tag/list'});
        };

        service.save = function(parameters){
            return ceAjax.post({url:'/tag', data:parameters});
        };

        service.deleteTag = function(parameters){
            return ceAjax.delete({url:'/tag',data:parameters});
        };

        return service;
    }
]);