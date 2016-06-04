'use strict';

/*
 Dynamic 编辑页面
 */
angular.module('user').controller('userRolePermissionsEditCtrl', [
    '$scope', '$log','$uibModalInstance','Authentication', 'RoleService', 'ResourceService','PermissionService', 'ceUtil','data',
    function ($scope, $log,$uibModalInstance,Authentication, RoleService, ResourceService, PermissionService, ceUtil, data) {

        var that = $scope;

        //当前登录用户
        that.currentUser = Authentication.user;

        that.resources = data.resources;
        that.permissions = data.permissions;


        //编辑
        that.publishedBtnText = '保存';
        that.item = data.role;
        that.item.resources = {};

        // todo Jason 加载角色当前权限 1.loadRolePermissionsToView逻辑写在service才妥当
        RoleService.getRolePermissions({role:data.role.role}).success(function (res) {
            loadRolePermissionsToView(res.data);
        });

        // 把API返回的数据转成View可以显示的格式
        function loadRolePermissionsToView(rolePermissions) {
            angular.forEach(rolePermissions, function (rolePermission, key){
                //注意这里会在旧的数据的基础上做更改
                angular.extend(that.item.resources[rolePermission.resource], rolePermission);
                if(!!rolePermission.permission) {
                    var permissions = rolePermission.permission.split(',');
                    angular.forEach(permissions, function (permission, key) {
                        that.item.resources[rolePermission.resource].permissions[permission].checked = true;
                        //警告:下面这种写法虽然和上面效果一样,但是实际却是new了一个obj,会导致绑定失败!
                        //that.item.resources[value.resource][permission] = {checked:true};
                    });
                }
            });
            // todo Jason 传递最底层checkbox勾选状态到其父级checkbox(通知子scope触发key为permission的checkbox事件,为解决BUG:非手动改变checkbox值时无法触发ng-click.求更优雅解决方案!)
            that.$broadcast('checkboxChangedToParents', 'permission');
        }

        //View数据转成可保存对象
        function loadViewToRolePermissions(data) {
            var rolePermissions = [];
            angular.forEach(data.resources, function (resource, key) {
                var permissions = [];
                angular.forEach(resource.permissions, function (permission, key) {
                    if(permission.checked === true){
                        permissions.push(key);
                    }
                });
                if(permissions.length > 0){
                    //注意这里会在旧的数据的基础上做更改
                    if(!resource.id) {
                        resource.role = data.role;
                        resource.resource = key;
                    }
                    resource.permission=permissions.join(',');
                }else{
                    if(!!resource.id){
                        resource.permission = null;
                    }
                }
                rolePermissions.push(resource);
            });
            return rolePermissions;
        }


        //保存
        that.onSaveClick = function () {
            RoleService.saveRolePermissions(loadViewToRolePermissions(that.item)).success(function (res) {
                ceUtil.toast('保存成功');
                $uibModalInstance.close(res.data);
            });
        };

        //窗口点击取消
        that.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }]);