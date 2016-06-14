/**
 * 贤哥超强封装ajax
 */
"use strict";

angular.module('core')
    .factory('ceAjax', [
        '$rootScope','$http','$q','$log','Authentication','ceUtil',
        function($rootScope,$http,$q,$log,Authentication,ceUtil) {

        var SUCCESS = 'success',
            FAIL = 'fail',
            ceAjaxService = {},
            token = Authentication.user.accessToken || "none";

        //异步
        var asyncService = function(){

            //Promise处理，统一调用接口风格
            var deferred = $q.defer();
            var promise = deferred.promise;
            promise.success = function(func){
                promise.then(func);
                return promise;
            };
            promise.error = function(func){
                promise.then(null, func);
                return promise;
            };
            promise.successCallback = function(res){
                deferred.resolve(res);
            };
            promise.errorCallback = function(res){
                deferred.reject(res);
            };
            return promise;

            //之前Yan写的low方法,作为反面教材展示
            //var selfService ={};
            //selfService.successCallback = null;
            //selfService.success = function(callback){
            //    selfService.successCallback =callback;
            //    return selfService;
            //};
            //selfService.errorCallback = null;
            //selfService.error = function(callback){
            //    selfService.errorCallback = callback;
            //    return selfService;
            //};
            //selfService.completeCallback = null;
            //selfService.complete = function(callback){
            //    selfService.completeCallback = callback;
            //    return selfService;
            //};
            //return selfService;
        };

        //$http统一管理方法(post,get等共同调用)
        var httpHandler = function (promise,options){

            angular.extend(options,{url:Authentication.apiURL+options.url});
            ceUtil.loading();
            $http(options).success(function(res){
                //$log.debug('request api success return:', res);
                ceUtil.loading();
                if(res && res.result===SUCCESS){
                    //if(angular.isArray(res.data)){
                    //    promise.values = [];
                    //    angular.extend(promise.values,res.data);
                    //}else{
                    //    angular.extend(promise,res.data);
                    //}
                    //if(angular.isFunction(promise.successCallback)){
                        return promise.successCallback(res);
                    //}
                }
                if(res && res.result===FAIL){
                    ceUtil.toast(res.data);
                }
                //if(typeof promise.errorCallback !== 'undefined'){
                //    if(angular.isFunction(promise.errorCallback)){
                        promise.errorCallback(res);
                //    }
                //}else{
                //    ceUtil.toast(res.message);
                //}
                //ceUtil.toast('提交失败');
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
            var promise = asyncService();
            var getOptions = {
                'url':options.url,
                'method':'get',
                'params':options.data || {}
            };
            angular.extend(getOptions.params, {access_token: token});
            httpHandler(promise,getOptions);
            return promise;
        };

        ceAjaxService.post = function(options){
            var promise = asyncService();
            angular.extend(options, {method:'post'});
            options.params = {
                access_token: token
            };
            httpHandler(promise,options);
            return promise;
        };

        ceAjaxService.delete = function(options){
            var promise = asyncService();
            var getOptions = {
                'url':options.url,
                'method':'delete',
                'params':options.data
            };
            angular.extend(getOptions.params, {access_token: token});
            httpHandler(promise,getOptions);
            return promise;
        };


    return ceAjaxService;
} ]);