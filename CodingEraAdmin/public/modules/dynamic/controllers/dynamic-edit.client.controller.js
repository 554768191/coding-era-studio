'use strict';

/*
 Dynamic 编辑页面
 */
angular.module('dynamic').controller('dynamicEditCtrl', [
    '$scope', '$log','$uibModalInstance','Authentication', 'DynamicService', 'ceUtil','data',
    function ($scope, $log,$uibModalInstance,Authentication, DynamicService, ceUtil,data) {

        $scope.publishedBtnText = '发布';

        $scope.dynamic = {};
        //当前登录用户
        $scope.currentUser = Authentication.user;

        //编辑
        if(!angular.isUndefined( data.id )){
             DynamicService.getDynamicById(data.id).success(function (res) {
                 $scope.dynamic = res.data;
            });
            $scope.publishedBtnText = '保存';
        }

        //发布&保存
        $scope.onPublishClick = function () {
            Authentication.isNotGuest(function(){
                DynamicService.save($scope.dynamic).success(function (res) {
                    ceUtil.toast('发布成功');
                    $uibModalInstance.close(res.data);

                });
            });
        };


        //窗口点击取消
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


    }]);

