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
            ceHttpService = {},
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
        };

        //$http统一管理方法(post,get等共同调用)
        var httpHandler = function (promise,options){

            angular.extend(options,{url:Authentication.apiURL+options.url});
            ceUtil.loading();
            $http(options).success(function(res){
                //$log.debug('request api success return:', res);
                ceUtil.loading();
                if(res && res.result===SUCCESS){
                    return promise.successCallback(res);
                }
                if(res && res.result===FAIL){
                    ceUtil.toast(res.data);
                }
                promise.errorCallback(res);
                ceUtil.toast('提交失败');
            }).error(function(res, status){
                $log.debug('request api error return:' + status, res);
                ceUtil.loading();
                if(res && res.data){
                    ceUtil.toast(res.data);
                    return;
                }
                if(res && res.message){
                    ceUtil.toast(res.message);
                    return;
                }
                ceUtil.toast('token过期,或者网络连接异常');//暂时这么写着
            });
        };

        ceHttpService.get = function(options){
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

        ceHttpService.post = function(options){
            var promise = asyncService();
            angular.extend(options, {method:'post'});
            options.params = {
                access_token: token
            };
            httpHandler(promise,options);
            return promise;
        };

        ceHttpService.delete = function(options){
            var promise = asyncService();
            var getOptions = {
                'url':options.url,
                'method':'delete',
                'params':options.data
            };
            //angular.extend(getOptions.params, {access_token: token});
            httpHandler(promise,getOptions);
            return promise;
        };


    return ceHttpService;
} ]);