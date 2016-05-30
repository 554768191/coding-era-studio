/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('user').factory('UserService', ['$log','$http', 'ceAjax',
    function ($log,$http, ceAjax) {

        var service = {};

        service.getUsers = function (parameters) {
            return ceAjax.get({url: '/user', data: parameters});
        };

        service.save = function (parameters) {
            return ceAjax.post({url: '/user', data: parameters});
        };



        return service;
    }
]);