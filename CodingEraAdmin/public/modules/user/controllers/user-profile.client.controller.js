'use strict';

angular.module('user').controller('UserProfileController', [
    '$scope', '$http', '$window', '$location', 'UserService','UserTagService', 'Authentication','ceUtil',
    function ($scope, $http, $window, $location, UserService, UserTagService , Authentication,ceUtil) {
        $scope.user = Authentication.user;
        $scope.readSaveAvatar = false;//是否要修改头像URL (修改头像时使用,避免未保存,头像先改了)
        $scope.readSaveAvatarUrl = '';



        //更新用户信息
        $scope.updateUserProfile = function () {
            $scope.success = $scope.error = null;
            var data = $scope.user;
            delete  data.roles;
            delete  data.authorities;

            //保存前,替换待保存头像URL
            if($scope.readSaveAvatar){
                $scope.user.avatar = $scope.readSaveAvatarUrl;
            }
            console.log(data);

            UserService.save(data).success(function(res) {
                $scope.success = true;
                $scope.user  = res.data;
                Authentication.user = res.data;
                $scope.readSaveAvatar = false;
                ceUtil.toast('保存成功');
            });

        };



        //修改头像
        $scope.onEditAvatarClick = function (){
            //使用 openModal 打开发布界面
            ceUtil.openModal({route:'usersManage.avatar'}).success(function(res){
                //未点保存,不应该直接修改user对象 ( 会影响到右上角头像也会更改 )
                //$scope.user.avatar = res.url();

                $scope.readSaveAvatar = true;
                $scope.readSaveAvatarUrl = res.url();

            });
        };


        //录入新标签事件
        $scope.tagTransform = function (str){
            return {
                id:null,
                name:str
            };
        };

        //获取所有标签
        function getTageList(){
            UserTagService.getTags().success(function(res){
                console.log(res);
                $scope.itemArray = res.data;
            });
        }
        getTageList();
        $scope.itemArray = [];
    }
]);