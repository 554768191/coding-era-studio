/**
 * 请求事件
 */
"use strict";

angular.module('core')
    .factory('CeUtil', ['$rootScope',function($rootScope) {
        var service = {};




        //弹出消息(默认5秒自动关闭)
        service.toast = function (message){
            //$rootScope.$emit("showToast",message);
            $rootScope.$emit("showToast",message);

        };

    return service;
} ]);