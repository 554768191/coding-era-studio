/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('user').factory('UserTagService', ['$log','$http', 'ceAjax',
    function ($log,$http, ceAjax) {

        var service = {};

        service.getTags = function () {
            return ceAjax.get({url: '/userProfileTag'});
        };


        return service;
    }
]);