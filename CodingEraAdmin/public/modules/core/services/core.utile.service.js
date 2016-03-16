/**
 * 请求事件
 */
"use strict";

angular.module('core')
    .factory('ceUtil', ['$rootScope','$templateCache','$compile',function($rootScope,$templateCache,$compile) {
        var service = {};




        //弹出消息(默认5秒自动关闭)
        service.toast = function (message){
            //$rootScope.$emit("showToast",message);
            $rootScope.$emit("showToast",message);

        };

        //获取分页模板
        service.getPaginationTemplate = function(){
            var paginationScope = $rootScope.$new(true);
            var paginationTemplate = $templateCache.get('cePaginationTemplate');
           // $compile(paginationTemplate)(paginationScope);
            return paginationTemplate;
           // return $templateCache.get('cePaginationTemplate');
        };

    return service;
} ]);