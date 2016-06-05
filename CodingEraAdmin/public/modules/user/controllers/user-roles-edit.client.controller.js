'use strict';

/*
 Dynamic 编辑页面
 */
angular.module('user').controller('userRolesEditCtrl', [
    '$scope','$timeout', '$log','$uibModalInstance','Authentication', 'RoleService', 'UserService', 'ceUtil','data',
    function ($scope,$timeout, $log,$uibModalInstance,Authentication, RoleService, UserService, ceUtil, data) {

        var that = $scope;

        //初始化
        that.init = function () {
            //当前登录用户
            that.currentUser = Authentication.user;

            //编辑
            that.publishedBtnText = '保存';
            that.roles = data.roles;
            that.item = data.user;

            //视图中使用了数组/MAP,如果立刻绑定数据,会显示错误
            $timeout(function() {
                UserService.loadAuthoritiesToView( that.item );
                //传递最底层checkbox勾选状态到其父级checkbox
                that.$broadcast('checkboxChangedToParents', 'role');
            },500);
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
        that.onCancelClick = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }]);