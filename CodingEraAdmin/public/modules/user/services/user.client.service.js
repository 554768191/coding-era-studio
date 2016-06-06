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

        service.create = function (parameters) {
            return ceAjax.post({url: '/open/user/signup', data: parameters});
        };

        service.saveUserRoles = function (userRolesView) {
            return ceAjax.post({url: '/user/roles', data: userRolesView});
        };

        service.findUserRolesByUserId = function (parameters) {
            return ceAjax.get({url: '/user/roles', data: parameters});
        };

        // 把API返回的数据转成View可以显示的格式 (备用)
        // "authorities":[{"authority":"ROLE_ADMIN"},{"authority":"ROLE_USER"},{"authority":"ROLE_MOBILE"}]
        service.loadAuthoritiesToView = function(user){
            angular.forEach(user.authorities, function (authority, key){
                if(angular.isUndefined(user.userRoles[authority.authority])){
                    return;
                }
                user.userRoles[authority.authority].checked = true;
            });
        };

        // 把API返回的数据转成View可以显示的格式
        // "roles":[{"id":5,"createdTime":null,"version":0,"role":"ROLE_USER"},{"id":6,"createdTime":null,"version":0,"role":"ROLE_JASON"}]
        service.loadUserRolesToView = function(user, userRoles){
            angular.forEach(userRoles, function (userRole, key){
                if(angular.isUndefined(user.userRoles[userRole.role])){
                    return;
                }
                angular.extend(user.userRoles[userRole.role], userRole);
                user.userRoles[userRole.role].checked = true;
            });
        };

        service.loadViewToUserRoles = function(user){
            var saveList = [];
            angular.forEach(user.userRoles, function (userRole, key) {
                if(userRole.id){
                    if(userRole.checked !== true){
                        userRole.role = null;
                    }
                    userRole.userId = user.id;
                    saveList.push(userRole);
                }else{
                    if(userRole.checked === true) {
                        userRole.userId = user.id;
                        userRole.role = key;
                        saveList.push(userRole);
                    }
                }
            });

            return saveList;
        };


        return service;
    }
]);