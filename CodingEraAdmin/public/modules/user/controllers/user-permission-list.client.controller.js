'use strict';

angular.module('user').controller('userPermissionListCtrl', [
    '$scope', '$log', '$state', '$stateParams', '$location', 'path', 'PermissionService', 'ceUtil',
    function ($scope, $log, $state, $stateParams, $location, path, PermissionService, ceUtil) {

        var that = $scope;

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
            PermissionService.getPermissionsList(searchOptions).success(function(res){
                that.jsonData = {content:res.data};
            });
        };
        that.onSearch();

        //编辑记录
        that.onEditClick = function(obj){
            if(obj){
                //$state.go('usersManage.permissionsManage.edit',{permissionId:obj.permission});
                ceUtil.openModal({route:'usersManage.permissionsManage.edit', data: obj}).success(function(res){
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

        that.onSearchClick = function(keyWord){
            searchOptions.keyWord = keyWord;
            that.onSearch();
        };
        
    }]);

