'use strict';

/*
 Dynamic 编辑页面
 */
angular.module('user').controller('userRoleEditCtrl', [
    '$scope', '$log','$uibModalInstance','Authentication', 'RoleService', 'ResourceService','PermissionService', 'ceUtil','data',
    function ($scope, $log,$uibModalInstance,Authentication, RoleService, ResourceService, PermissionService, ceUtil, data) {

        var that = $scope;

        //当前登录用户
        that.currentUser = Authentication.user;

        that.resources = data.resources;
        that.permissions = data.permissions;


        //编辑
        if(angular.isUndefined( data.role.role )){
            that.item = data.role;
            that.publishedBtnText = '新增';
        }else{
        //    that.item = RoleService.getById(data.role);
            that.item = data.role;
            that.publishedBtnText = '保存';
        }

        //发布&保存
        that.onSaveClick = function () {
            delete  that.item.checked;
            delete  that.item.resources;
            RoleService.save(that.item).success(function (res) {
                ceUtil.toast('发布成功');
                $uibModalInstance.close(res.data);

            });

        };


        //窗口点击取消
        that.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }]);

