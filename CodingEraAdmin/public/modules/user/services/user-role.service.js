/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('user').factory('ResourceService', [
    '$log','$http', 'ceAjax',
    function ($log,$http, ceAjax) {

        var service = {};

        service.getResources = function (parameters) {
            return ceAjax.get({url: '/resource', data: parameters});
        };

        service.save = function (parameters) {
            return ceAjax.post({url: '/resource', data: parameters});
        };



        return service;
    }
]);