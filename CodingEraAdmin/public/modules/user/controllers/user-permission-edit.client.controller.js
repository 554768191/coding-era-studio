'use strict';

/*
 Dynamic 编辑页面
 */
angular.module('user').controller('userPermissionEditCtrl', [
    '$scope', '$log','$uibModalInstance','Authentication', 'PermissionService', 'ceUtil','data',
    function ($scope, $log,$uibModalInstance,Authentication, PermissionService, ceUtil,data) {

        var that = $scope;

        //that.item = {};
        //当前登录用户
        that.currentUser = Authentication.user;

        //编辑
        //if(angular.isUndefined( data.permission )){

            that.item = data;
            //that.publishedBtnText = '新增';
        //}else{
        //    that.item = PermissionService.getById(data.permission);
            that.publishedBtnText = '保存';
        //}

        //发布&保存
        that.onPublishClick = function () {

            PermissionService.save(that.item).success(function (res) {
                ceUtil.toast('发布成功');
                $uibModalInstance.close(res.data);

            });

        };


        //窗口点击取消
        that.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }]);

