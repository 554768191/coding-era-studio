'use strict';

/*
 Tag 编辑页面
 */
angular.module('case').controller('tagEditCtrl', [
    '$scope', '$log','$uibModalInstance', 'TagService', 'ceUtil','data',
    function ($scope, $log,$uibModalInstance, TagService, ceUtil,data) {

        $scope.tag = {};
        if (angular.isDefined(data.id)) {
            TagService.getTagById(data.id).success(function (res) {
                $scope.tag = res.data.tag;
            });
        }

        //发布&保存
        $scope.onPublishClick = function (status, isValid) {
            if(!isValid){
                return;
            }
            $scope.tag.status = status;
            TagService.save($scope.tag).success(function (res) {
                ceUtil.toast('保存成功');
                $uibModalInstance.close(res.data);
            });
        };

        //窗口点击取消
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);

