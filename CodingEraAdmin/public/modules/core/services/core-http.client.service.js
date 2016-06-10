/**
 * 贤哥超强封装ajax
 */
"use strict";

angular.module('core')
    .factory('ceAjax', [
        '$rootScope','$http','$log','Authentication','ceUtil',
        function($rootScope,$http,$log,Authentication,ceUtil) {
        var ceAjaxService = {};
        var token = Authentication.user.accessToken || "none";

        var customService = function(){
            var selfService ={};
            selfService.successCallback = null;
            selfService.success = function(callback){
                selfService.successCallback =callback;
                return selfService;
            };
            selfService.errorCallback = null;
            selfService.error = function(callback){
                selfService.errorCallback = callback;
                return selfService;
            };
            selfService.completeCallback = null;
            selfService.complete = function(callback){
                selfService.completeCallback = callback;
                return selfService;
            };
            return selfService;
        };

        //post,get等共同调用
        var commentService = function (selfService,options){

            angular.extend(options,{url:Authentication.apiURL+options.url});
            ceUtil.loading();
            $http(options).success(function(res){
                $log.debug('request api success return:', res);
                ceUtil.loading();
                if(res && res.result==='success'){
                    if(angular.isArray(res.data)){
                        selfService.values = [];
                        angular.extend(selfService.values,res.data);
                    }else{
                        angular.extend(selfService,res.data);
                    }
                    if(angular.isFunction(selfService.successCallback)){
                        selfService.successCallback(res);
                    }
                    return;
                }
                if(res && res.result==='fail'){
                    ceUtil.toast(res.data);
                    return;
                }
                if(typeof selfService.errorCallback !== 'undefined'){
                    if(angular.isFunction(selfService.errorCallback)){
                        selfService.errorCallback(res);
                    }
                }else{
                    ceUtil.toast(res.message);
                }
                ceUtil.toast('提交失败');
            }).error(function(res){
                $log.debug('request api error return:', res);
                ceUtil.loading();
                if(res){
                    if(res.data){
                        ceUtil.toast(res.data);
                        return;
                    }
                    if(res.message){
                        ceUtil.toast(res.message);
                        return;
                    }
                }
                ceUtil.toast('token过期,或者网络连接异常');//暂时这么写着
            });
        };



        ceAjaxService.get = function(options){
            var selfService = customService();
            var getOptions = {
                'url':options.url,
                'method':'get',
                'params':options.data || {}
            };
            angular.extend(getOptions.params, {access_token: token});
            commentService(selfService,getOptions);
            return selfService;
        };

        ceAjaxService.post = function(options){
            var selfService = customService();
            angular.extend(options, {method:'post'});
            options.params = {
                access_token: token
            };
            commentService(selfService,options);
            return selfService;
        };

        ceAjaxService.delete = function(options){
            var selfService = customService();
            var getOptions = {
                'url':options.url,
                'method':'delete',
                'params':options.data
            };
            angular.extend(getOptions.params, {access_token: token});
            commentService(selfService,getOptions);
            return selfService;
        };


    return ceAjaxService;
} ]);