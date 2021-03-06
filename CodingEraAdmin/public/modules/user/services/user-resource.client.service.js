/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('user').factory('ResourceService', [
    '$log','$http', 'ceAjax',
    function ($log,$http, ceAjax) {

        var service = {};

        service.getResources = function (parameters) {
            return ceAjax.get({url: '/resources', data: parameters});
        };

        service.getResourcesList = function (parameters) {
            return ceAjax.get({url: '/resources/list', data: parameters});
        };

        service.save = function (parameters) {
            return ceAjax.post({url: '/resources', data: parameters});
        };



        return service;
    }
]);