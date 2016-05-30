/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('user').factory('UserTagService', ['$log','$http', 'ceAjax',
    function ($log,$http, ceAjax) {

        var service = {};

        service.getUsers = function (parameters) {
            return ceAjax.get({url: '/user', data: parameters});
        };

        service.save = function (parameters) {
            return ceAjax.post({url: '/user', data: parameters});
        };

        //此update比较特殊,不是直接请求API和上面的save方法不同
        service.update = function(parameters){
           return $http.put('/users',
                parameters
            );
        };

        return service;
    }
]);