/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('article').factory('ArticleService', [ '$log','ceAjax',
    function($log,ceAjax) {

        var service ={};

        service.getArticleById = function(id){
            return ceAjax.get({url:'/article/'+id});
        };

        service.saveArticle = function(parameters){
            return ceAjax.post({url:'/article', data:parameters});
        };

        service.getArticles = function(parameters){
            return ceAjax.get({url:'/article/list',data:parameters});
        };

        service.deleteArticle = function(parameters){
            return ceAjax.delete({url:'/article',data:parameters});
        };

        return service;
    }
]);