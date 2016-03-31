/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('comment').factory('CommentService', [ '$log','ceAjax',
    function($log,ceAjax) {

        var service ={};

        service.getCommentById = function(id){
            return ceAjax.get({url:'/comments/'+id});
        };

        service.getRootComments = function(parameters){
            parameters = parameters || {};
            parameters.parentId = 0;
            return ceAjax.get({url:'/comments',data:parameters});
        };

        service.getReplies = function(parameters){
            return ceAjax.get({url:'/comments',data:parameters});
        };

        service.getComments = function(parameters){
            return ceAjax.get({url:'/comments',data:parameters});
        };

        service.getAllComments = function(){
            return ceAjax.get({url:'/comments/list'});
        };

        service.save = function(parameters){
            return ceAjax.post({url:'/comments', data:parameters});
        };

        service.deleteComment = function(parameters){
            return ceAjax.delete({url:'/comments',data:parameters});
        };

        return service;
    }
]);