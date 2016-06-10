'use strict';

angular.module('user').controller('SettingsAvatarController', [
    '$scope', '$uibModalInstance','$log','leanCloud','ceUtil',
    function ($scope,$uibModalInstance,$log,leanCloud,ceUtil) {


        //确定
        $scope.onOkClick = function () {
            var scopeImage = $scope.cropAvatarUrl;
            $log.debug('scopeImage',scopeImage);
            if(scopeImage.length > 0){
                leanCloud.uploadImageByBase64($scope.cropAvatarUrl).success(function(res){
                    $uibModalInstance.close(res);
                });
            }else{
                ceUtil.toast('请选择图片');
            }
        };


        //窗口点击取消
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };



    }
]);