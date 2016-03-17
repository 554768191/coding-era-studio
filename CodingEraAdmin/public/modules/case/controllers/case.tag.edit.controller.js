'use strict';

/*
 Demo 编辑页面
 */
angular.module('case').controller('tagEditCtrl', ['$scope', '$uibModalInstance', '$log', 'TagService', 'ceUtil',
    function ($scope, $uibModalInstance, $log, TagService, ceUtil) {

        $scope.tag = {};

        $scope.ok = function () {
            TagService.save($scope.tag).success(function(res){
                ceUtil.toast('保存成功');
                $uibModalInstance.close();
            });
        };


        //窗口点击取消
        $scope.cancel = function () {
            //angular-bootstarp-api默认关闭事件,不要问我为什么
            $uibModalInstance.dismiss('cancel');
        };


    }]);

