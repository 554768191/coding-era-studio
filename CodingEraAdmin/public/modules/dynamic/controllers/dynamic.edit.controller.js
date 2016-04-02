'use strict';

/*
 Dynamic 编辑页面
 */
angular.module('dynamic').controller('dynamicEditCtrl', [
    '$scope', '$log', '$state', '$stateParams', 'DynamicService', 'ceUtil',
    function ($scope, $log, $state, $stateParams, DynamicService, ceUtil) {

        $scope.dynamic = {};

        if (angular.isDefined($stateParams.dynamicId)) {
            DynamicService.getDynamicById($stateParams.dynamicId).success(function (res) {
                $scope.dynamic = res.data.dynamic;
            });
        }

        //发布&保存
        $scope.onPublishClick = function (status) {
            $scope.dynamic.status = status;
            DynamicService.save($scope.dynamic).success(function (res) {
                ceUtil.toast('保存成功');
                $state.go('dynamicManage.list', {status: status});
            });
        };


        //窗口点击取消
        $scope.cancel = function () {
            history.back(-1);
        };


    }]);

