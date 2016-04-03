'use strict';

/*
 Dynamic 编辑页面
 */
angular.module('dynamic').controller('dynamicEditCtrl', [
    '$scope', '$log','$uibModalInstance','Authentication', 'DynamicService', 'ceUtil',
    function ($scope, $log,$uibModalInstance,Authentication, DynamicService, ceUtil) {

        $scope.dynamic = {};
        //当前登录用户
        $scope.currentUser = Authentication.user;


        //发布&保存
        $scope.onPublishClick = function () {
            DynamicService.save($scope.dynamic).success(function (res) {
                ceUtil.toast('发布成功');
                $uibModalInstance.close(res.data);

            });
        };


        //窗口点击取消
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }]);

