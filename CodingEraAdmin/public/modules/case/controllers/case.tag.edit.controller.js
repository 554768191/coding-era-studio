'use strict';

/*
 Tag 编辑页面
 */
angular.module('case').controller('tagEditCtrl', [
    '$scope', '$state', '$stateParams', '$log', 'TagService', 'ceUtil',
    function ($scope, $state, $stateParams, $log, TagService, ceUtil) {

        $scope.tag = {};

        if (angular.isDefined($stateParams.tagId)) {
            TagService.getTagById($stateParams.tagId).success(function (res) {
                $scope.tag = res.data.tag;
            });
        }

        //发布&保存
        $scope.onPublishClick = function (status) {
            $scope.tag.status = status;
            TagService.save($scope.tag).success(function (res) {
                ceUtil.toast('保存成功');
                $state.go('tagManage.list', {status: status});
            });
        };

    }]);

