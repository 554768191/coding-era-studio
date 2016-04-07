'use strict';

angular.module('users').controller('SettingsAvatarController', [
    '$scope', '$uibModalInstance','leanCloud','ceUtil',
    function ($scope,$uibModalInstance, leanCloud,ceUtil) {


        //确定
        $scope.onOkClick = function () {
            var scopeImage = $scope.cropAvatarUrl;
            console.log('scopeImage',scopeImage);
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