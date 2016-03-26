'use strict';

/*
 Comment 编辑页面
 */
angular.module('case').controller('commentEditCtrl', [
    '$scope', '$uibModalInstance', '$log', 'CommentService', 'ceUtil', 'comment',
    function ($scope, $uibModalInstance, $log, CommentService, ceUtil, comment) {

        $scope.comment = comment || {};

        $scope.ok = function () {
            var storeComment = $scope.comment;
            storeComment.ceCase = {id:6};
            storeComment.parentId = storeComment.parentId || 0;
            storeComment.status = storeComment.status || 'WAITING';
            delete storeComment.$$hashKey;

            CommentService.save(storeComment).success(function(res){
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

