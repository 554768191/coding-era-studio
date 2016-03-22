/**
 * 请求事件
 */
"use strict";

angular.module('core')
    .factory('leanCloud', ['$rootScope','$log','ceUtil',function($rootScope,$log,ceUtil) {
        var service = {};


        var customService = function(processObj){
            var selfService ={};
            selfService.successCallback = null;
            selfService.success = function(callback){
                selfService.successCallback =callback;
                return processObj;
            };
            selfService.errorCallback = null;
            selfService.error = function(callback){
                selfService.errorCallback = callback;
                return processObj;
            };

            return selfService;
        };

        service.uploadImage = function(file){
            var self = this;
            var name = file.name;
            var avFile = new AV.File(name, file);
            var selfService = customService(self);
            ceUtil.loading();
            avFile.save().then(function(obj) {
                ceUtil.loading();
                selfService.successCallback(obj);
            }, function(err) {
                ceUtil.loading();
                ceUtil.toast('上传失败啦,请稍后再试');
                $log.debug('-------------上传文件失败日志-----------------');
                $log.debug(err);
                $log.debug('-------------上传文件失败日志-----------------');
                selfService.errorCallback(err);
            });
            return selfService;
        };



        return service;
} ]);