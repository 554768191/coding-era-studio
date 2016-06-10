'use strict';

/*
 Dynamic 编辑页面
 */
angular.module('user').controller('userResourceEditCtrl', [
    '$scope', '$log','$uibModalInstance','Authentication', 'ResourceService', 'ceUtil','data',
    function ($scope, $log,$uibModalInstance,Authentication, ResourceService, ceUtil,data) {

        var that = $scope;

        //that.item = {};
        //当前登录用户
        that.currentUser = Authentication.user;

        //编辑
        //if(angular.isUndefined( data.resource )){

            that.item = data;
            //that.publishedBtnText = '新增';
        //}else{
        //    that.item = ResourceService.getById(data.resource);
            that.publishedBtnText = '保存';
        //}

        //发布&保存
        that.onPublishClick = function () {

            ResourceService.save(that.item).success(function (res) {
                ceUtil.toast('发布成功');
                $uibModalInstance.close(res.data);

            });

        };


        //窗口点击取消
        that.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }]);

