/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('user').factory('PermissionService', [
    '$log','$http', 'ceAjax',
    function ($log,$http, ceAjax) {

        var service = {};

        service.getPermissions = function (parameters) {
            return ceAjax.get({url: '/permission', data: parameters});
        };

        service.getPermissionsList = function (parameters) {
            return ceAjax.get({url: '/permission/list', data: parameters});
        };

        service.save = function (parameters) {
            return ceAjax.post({url: '/permission', data: parameters});
        };



        return service;
    }
]);