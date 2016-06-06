'use strict';

angular.module('user').controller('usersListCtrl', [
    '$scope', '$log', '$state', '$stateParams', '$location', 'path', 'UserService', 'RoleService', 'ceUtil',
    function ($scope, $log, $state, $stateParams, $location, path, UserService, RoleService, ceUtil) {


        //{name: 'displayName', displayName: '昵称', allowCellFocus: true},
        //{name: 'username', displayName: '登录名'},
        //{name: 'sex', displayName: '性别'},
        //{name: 'type1', displayName: '头像'},
        //{name: 'email', displayName: '邮箱'},
        //{name: 'phone', displayName: '手机'},
        //{name: 'enable', displayName: '状态'},

        var that = $scope;

        RoleService.getRolesList().success(function(res){
            that.roles = res.data;
        });

        that.jsonData = {};
        that.key = 'title';

        //分页参数
        var searchOptions = ceUtil.initPageParameter({
            status:$stateParams.status,
            enabled:$stateParams.enabled,
            keyWord:null
        });

        //搜索
        that.onSearch = function(){
            UserService.getUsers(searchOptions).success(function(res){
                that.jsonData = res.data;
            });
        };
        that.onSearch();

        //编辑记录
        that.onEditUserClick = function(obj){
            $state.go('usersManage.edit',{
                username:obj.username
            });
        };

        //用户角色编辑
        that.onEditRolesClick = function(obj){
            if(obj){
                ceUtil.openModal({route:'usersManage.roles',
                    data: {
                        user:angular.copy(obj),//直接传copy对象,不另外查一次了
                        roles:that.roles
                    }
                }).success(function(res){
                    //重新加载数据
                    that.onSearch();
                });
            }
        };

        //删除记录
        that.onDeleteClick = function(obj){
            ceUtil.confirmMessage('确认删除?').success(function(){
                //UserService.deleteUsers({id:obj.id}).success(function(){
                //    ceUtil.toast('删除成功');
                //    that.onSearch();
                //});
            });
        };

        that.onResetPasswordClick = function(obj){

        };

        //上一页
        that.previousPage = function(){
            searchOptions.page -= 1;
            that.onSearch();
        };

        //下一页
        that.nextPage = function(){
            searchOptions.page += 1;
            that.onSearch();

        };

        that.onSearchClick = function(keyWord){
            searchOptions.keyWord = keyWord;
            that.onSearch();
        };
        
    }]);

