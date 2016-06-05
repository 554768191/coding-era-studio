'use strict';

/*
 Dynamic 编辑页面
 */
angular.module('user').controller('userRolePermissionsEditCtrl', [
    '$scope', '$log','$uibModalInstance','Authentication', 'RoleService', 'ResourceService','PermissionService', 'ceUtil','data',
    function ($scope, $log,$uibModalInstance,Authentication, RoleService, ResourceService, PermissionService, ceUtil, data) {

        var that = $scope;

        //初始化
        that.init = function () {
            //当前登录用户
            that.currentUser = Authentication.user;

            that.resources = data.resources;
            that.permissions = data.permissions;


            //编辑
            that.publishedBtnText = '保存';
            that.item = data.role;
            that.item.resources = {};

            RoleService.getRolePermissions({role: data.role.role}).success(function (res) {
                RoleService.loadRolePermissionsToView(that.item, res.data);
                // todo Jason 传递最底层checkbox勾选状态到其父级checkbox(通知子scope触发key为permission的checkbox事件,为解决BUG:非手动改变checkbox值时无法触发ng-click.求更优雅解决方案!)
                that.$broadcast('checkboxChangedToParents', 'permission');
            });
        };
        that.init();

        //保存
        that.onSaveClick = function () {
            RoleService.saveRolePermissions(RoleService.loadViewToRolePermissions(that.item)).success(function (res) {
                ceUtil.toast('保存成功');
                $uibModalInstance.close(res.data);
            });
        };

        //窗口点击取消
        that.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }]);