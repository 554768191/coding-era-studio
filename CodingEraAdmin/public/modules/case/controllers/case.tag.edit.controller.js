'use strict';

/*
 Tag 编辑页面
 */
angular.module('case').controller('tagEditCtrl', [
    '$scope', '$uibModalInstance', '$log', 'TagService', 'ceUtil', 'tag',
    function ($scope, $uibModalInstance, $log, TagService, ceUtil, tag) {

        $scope.tag = tag || {};

        $scope.ok = function () {
            TagService.save($scope.tag).success(function(res){
                ceUtil.toast('保存成功');
                $uibModalInstance.close();
            });
        };


        //窗口点击取消
        $scope.cancel = function () {
            //angular-bootstarp-api默认关闭事件
            $uibModalInstance.dismiss('cancel');
        };


    }]);

