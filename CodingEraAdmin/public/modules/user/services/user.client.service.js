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
        service.getUserByUsername = function (username) {
            return ceAjax.get({url: '/user/' + username});
        };

        service.save = function (parameters) {
            return ceAjax.post({url: '/user', data: parameters});
        };

        // 把API返回的数据转成View可以显示的格式
        // "authorities":[{"authority":"ROLE_ADMIN"},{"authority":"ROLE_USER"},{"authority":"ROLE_MOBILE"}]
        service.loadAuthoritiesToView = function(user){
            angular.forEach(user.authorities, function (authority, key){
                if(angular.isUndefined(user.roles[authority.authority])){
                    return;
                }
                user.roles[authority.authority].checked = true;
            });
        };

        return service;
    }
]);