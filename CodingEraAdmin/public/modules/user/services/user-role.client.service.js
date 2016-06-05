/**
 * Created by Yan on 15/12/8.
 */
'use strict';
angular.module('user').factory('RoleService', [
    '$log','$http', 'ceAjax',
    function ($log,$http, ceAjax) {

        var service = {};

        service.getRoles = function (parameters) {
            return ceAjax.get({url: '/roles', data: parameters});
        };

        service.getRolesList = function (parameters) {
            return ceAjax.get({url: '/roles/list', data: parameters});
        };

        service.save = function (parameters) {
            return ceAjax.post({url: '/roles', data: parameters});
        };

        service.getRolePermissions = function (parameters) {
            return ceAjax.get({url: '/roles/permissions', data: parameters});
        };

        service.saveRolePermissions = function (parameters) {
            var saveView = {
                rolePermissions:parameters
            };
            return ceAjax.post({url: '/roles/permissions', data: saveView});
        };

        // 把API返回的数据转成View可以显示的格式
        service.loadRolePermissionsToView = function(role, rolePermissions) {
            angular.forEach(rolePermissions, function (rolePermission, key){
                //注意这里会在旧的数据的基础上做更改
                angular.extend(role.resources[rolePermission.resource], rolePermission);
                if(!!rolePermission.permission) {
                    var permissions = rolePermission.permission.split(',');
                    angular.forEach(permissions, function (permission, key) {
                        role.resources[rolePermission.resource].permissions[permission].checked = true;
                        //todo Jason 警告:下面这种实际是new了一个obj,会导致checkbox绑定失败!
                        //role.resources[value.resource][permission] = {checked:true};
                    });
                }
            });
        };


        //View数据转成可保存对象
        service.loadViewToRolePermissions = function(data) {
            var rolePermissions = [];
            angular.forEach(data.resources, function (resource, key) {
                var permissions = [];
                angular.forEach(resource.permissions, function (permission, key) {
                    if(permission.checked === true){
                        permissions.push(key);
                    }
                });
                //注意这里会在旧记录的基础上做更改
                if(permissions.length > 0){
                    if(!resource.id) {
                        //填充新纪录必要字段信息
                        resource.role = data.role;
                        resource.resource = key;
                    }
                    resource.permission=permissions.join(',');
                    rolePermissions.push(resource);
                }else{
                    //没权限时要把旧记录的权限清空
                    if(resource.id){
                        resource.permission = null;
                        rolePermissions.push(resource);
                    }
                }
            });
            return rolePermissions;
        };



        return service;
    }
]);