'use strict';

angular.module('user').controller('UserProfileController', [
    '$scope', '$http', '$window', '$location', '$stateParams', 'UserService','UserTagService', 'Authentication','ceUtil',
    function ($scope, $http, $window, $location, $stateParams, UserService, UserTagService , Authentication,ceUtil) {

        var that = $scope;
        $scope.isGuest = Authentication.isGuest();

        that.loadData = function () {
            if ($stateParams.username) {
                if ('create' === $stateParams.username) {
                    //1.新增用户
                    that.isCreate = true;
                    that.user  = {};
                } else {
                    //2.编辑用户
                    UserService.getUserByUsername($stateParams.username).success(function (res) {
                        that.user  = res.data;
                    });
                }
            } else {
                //3.个人信息
                that.user  = Authentication.user;
            }
        };

        that.init = function () {
            that.readSaveAvatar = false;//是否要修改头像URL (修改头像时使用,避免未保存,头像先改了)
            that.readSaveAvatarUrl = '';
            that.isCreate = false;//是否新增用户
            that.loadData();
        };
        that.init();

        //更新用户信息
        that.onSaveUserClick = function () {
            that.success = that.error = null;
            var data = that.user;
            delete  data.roles;
            delete  data.authorities;

            //保存前,替换待保存头像URL
            if(that.readSaveAvatar){
                that.user.avatar = that.readSaveAvatarUrl;
            }

            var callback = function(res) {
                that.success = true;
                that.user  = res.data;
                //Authentication.user = res.data;
                that.readSaveAvatar = false;
                ceUtil.toast('保存成功');
            };
            if(that.isCreate){
                UserService.create(data).success(callback);
            }else{
                UserService.save(data).success(callback);
            }

        };

        //修改头像
        that.onEditAvatarClick = function (){
            //使用 openModal 打开发布界面
            ceUtil.openModal({route:'usersManage.avatar'}).success(function(res){
                //未点保存,不应该直接修改user对象 ( 会影响到右上角头像也会更改 )
                //that.user.avatar = res.url();

                that.readSaveAvatar = true;
                that.readSaveAvatarUrl = res.url();

            });
        };

        //录入新标签事件
        that.tagTransform = function (str){
            return {
                id:null,
                name:str
            };
        };

        //获取所有标签
        that.getTageList = function(){
            UserTagService.getTags().success(function(res){
                that.itemArray = res.data;
            });
        };
        that.getTageList();
        that.itemArray = [];
    }
]);