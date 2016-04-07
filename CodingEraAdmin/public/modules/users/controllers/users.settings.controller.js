'use strict';

angular.module('users').controller('SettingsController', [
    '$scope', '$http', '$window', '$location', 'UserService', 'Authentication','ceUtil',
    function ($scope, $http, $window, $location, UserService, Authentication,ceUtil) {
        $scope.user = Authentication.user;
        $scope.readSaveAvatar = false;//是否要修改头像URL (修改头像时使用,避免未保存,头像先改了)
        $scope.readSaveAvatarUrl = '';

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');

        // Check if there are additional accounts
        $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
            for (var i in $scope.user.additionalProvidersData) {
                return true;
            }

            return false;
        };

        // Check if provider is already in use with current user
        $scope.isConnectedSocialAccount = function (provider) {
            return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
        };

        // Remove a user social account
        $scope.removeUserSocialAccount = function (provider) {
            $scope.success = $scope.error = null;
            $http.delete('/users/accounts', {
                params: {
                    provider: provider
                }
            }).success(function (response) {
                // If successful show success message and clear form
                $scope.success = true;
                $scope.user = Authentication.user = response;
            }).error(function (response) {
                $scope.error = response.message;
            });
        };

        // Update a user profile
        $scope.updateUserProfile = function (isValid) {
            if (isValid) {
                $scope.success = $scope.error = null;
                var data = $scope.user;
                delete  data.roles;
                delete  data.authorities;

                //保存前,替换待保存头像URL
                if($scope.readSaveAvatar){
                    $scope.user.avatar = $scope.readSaveAvatarUrl;
                }

                    // 佶闪  看到这里,记得把这段提取到Service
                    $http.put('/users',
                        data
                    ).success(function(response) {
                        // If successful show success message and clear form
                        $scope.success = true;
                        $scope.user = Authentication.user = response;
                        $scope.readSaveAvatar = false;
                        ceUtil.toast('保存成功');
                    }).error(function(response) {
                        $scope.error = response.message;
                    });
            } else {
                $scope.submitted = true;
            }
        };

        // Change user password
        $scope.changeUserPassword = function () {
            $scope.success = $scope.error = null;

            $http.post('/users/password', $scope.passwordDetails).success(function (response) {
                // If successful show success message and clear form
                $scope.success = true;
                $scope.passwordDetails = null;
            }).error(function (response) {
                $scope.error = response.message;
            });
        };


        //发布动态
        $scope.onEditAvatarClick = function (){
            //使用 openModal 打开发布界面
            ceUtil.openModal({route:'usersManage.avatar'}).success(function(res){
                //未点保存,不应该直接修改user对象 ( 会影响到右上角头像也会更改 )
                //$scope.user.avatar = res.url();

                $scope.readSaveAvatar = true;
                $scope.readSaveAvatarUrl = res.url();

            });
        };
    }
]);