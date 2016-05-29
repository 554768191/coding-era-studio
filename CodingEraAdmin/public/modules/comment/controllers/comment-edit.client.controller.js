'use strict';

/*
 Comment 编辑页面
 */
angular.module('comment').controller('commentEditCtrl', [
    '$scope', '$log', '$state', '$stateParams', 'CommentService', 'ceUtil',
    function ($scope, $log, $state, $stateParams, CommentService, ceUtil) {

        $scope.comment = {};

        if (angular.isDefined($stateParams.commentId)) {
            CommentService.getCommentById($stateParams.commentId).success(function (res) {
                $scope.comment = res.data.comment;
            });
        }

        //发布&保存
        $scope.onPublishClick = function (status) {
            $scope.comment.status = status;
            CommentService.save($scope.comment).success(function (res) {
                ceUtil.toast('保存成功');
                $state.go('commentManage.list', {status: status});
            });
        };


        //窗口点击取消
        $scope.cancel = function () {
            history.back(-1);
        };


    }]);

