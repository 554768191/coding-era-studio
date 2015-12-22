/**
 * 请求事件
 */
"use strict";

angular.module('core')
    .factory('LoadingBar', [ function() {
    var service = {};
    service.isShow = false;

    service.show = function(){
        service.isShow = true;
    };

    service.hide = function (){
        service.isShow = false;
    };

    return service;
} ]);