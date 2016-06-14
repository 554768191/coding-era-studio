'use strict';

angular.module('user').controller('userRoleListCtrl', [
    '$scope', '$q', '$log', '$state', '$stateParams', '$location', 'path', 'RoleService', 'ResourceService', 'PermissionService', 'ceUtil',
    function ($scope, $q, $log, $state, $stateParams, $location, path, RoleService, ResourceService, PermissionService, ceUtil) {

        var that = $scope;

        that.init = function() {
            that.key = 'title';
            that.jsonData = {};

            //性能优化:多个异步任务的并行处理
            $q.all([
                ResourceService.getResourcesList(),
                PermissionService.getPermissionsList()
            ])
            .then(function (results) {
                that.resources = results[0].data;
                that.permissions = results[1].data;
            });
            //反面教材展示,等同上面代码
            //ResourceService.getResourcesList().success(function (res) {
            //    that.resources = res.data;
            //});
            //PermissionService.getPermissionsList().success(function (res) {
            //    that.permissions = res.data;
            //});
        };
        that.init();

        //分页参数
        var searchOptions = ceUtil.initPageParameter({
            //status:$stateParams.status,
            //enabled:$stateParams.enabled,
            keyWord:null
        });

        //搜索
        that.onSearch = function(){
            RoleService.getRoles(searchOptions).success(function(res){
                that.jsonData = res.data;
            });
        };
        that.onSearch();

        //编辑记录
        that.onEditClick = function(obj){
            if(obj){
                //$state.go('usersManage.rolesManage.edit',{roleId:obj.role});
                ceUtil.openModal({
                    route:'usersManage.rolesManage.edit',
                    data: {
                        role:angular.copy(obj),//直接传copy对象,不另外查一次了
                        resources:that.resources,
                        permissions:that.permissions
                    }
                }).success(function(res){
                    //重新加载数据
                    $scope.onSearch();
                });
            }
        };

        //角色权限
        that.onEditPermissionsClick = function(obj){
            if(obj){
                ceUtil.openModal({
                    route:'usersManage.rolesManage.permissions',
                    data: {
                        role:angular.copy(obj),//直接传copy对象,不另外查一次了
                        resources:that.resources,
                        permissions:that.permissions
                    }
                }).success(function(res){
                    //重新加载数据
                    $scope.onSearch();
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

        //查询事件
        that.onSearchClick = function(keyWord){
            searchOptions.keyWord = keyWord;
            that.onSearch();
        };
        
    }]);

