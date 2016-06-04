/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('user').factory('RoleService', [
    '$log','$http', 'ceAjax',
    function ($log,$http, ceAjax) {

        var service = {};

        service.getRoles = function (parameters) {
            return ceAjax.get({url: '/role', data: parameters});
        };

        service.getRolePermissions = function (parameters) {
            return ceAjax.get({url: '/role/permissions', data: parameters});
        };

        service.save = function (parameters) {
            return ceAjax.post({url: '/role', data: parameters});
        };

        service.saveRolePermissions = function (parameters) {
            var saveView = {
                rolePermissions:parameters
            };
            return ceAjax.post({url: '/role/permissions', data: saveView});
        };



        return service;
    }
]);