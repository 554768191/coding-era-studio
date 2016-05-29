'use strict';

angular.module('user').controller('usersListCtrl', [
    '$scope', '$log', '$state', '$stateParams', '$location', 'path', 'UserService', 'ceUtil',
    function ($scope, $log, $state, $stateParams, $location, path, UserService, ceUtil) {


        //{name: 'displayName', displayName: '昵称', allowCellFocus: true},
        //{name: 'username', displayName: '登录名'},
        //{name: 'sex', displayName: '性别'},
        //{name: 'type1', displayName: '头像'},
        //{name: 'email', displayName: '邮箱'},
        //{name: 'phone', displayName: '手机'},
        //{name: 'enable', displayName: '状态'},


        $scope.jsonData = {};
        $scope.key = 'title';

        //分页参数
        var searchOptions = ceUtil.initPageParameter({
            status:$stateParams.status,
            enabled:$stateParams.enabled,
            keyWord:null
        });

        //搜索
        $scope.onSearch = function(){
            UserService.getUsers(searchOptions).success(function(res){
                $scope.jsonData = res.data;
            });
        };
        $scope.onSearch();

        //编辑记录
        $scope.onEditClick = function(obj){
            $state.go('usersManage.edit',{usersId:obj.id});
        };

        //删除记录
        $scope.onDeleteClick = function(obj){
            ceUtil.confirmMessage('确认删除?').success(function(){
                //UserService.deleteUsers({id:obj.id}).success(function(){
                //    ceUtil.toast('删除成功');
                //    $scope.onSearch();
                //});
            });
        };

        //上一页
        $scope.previousPage = function(){
            searchOptions.page -= 1;
            $scope.onSearch();
        };

        //下一页
        $scope.nextPage = function(){
            searchOptions.page += 1;
            $scope.onSearch();

        };

        $scope.onSearchClick = function(keyWord){
            searchOptions.keyWord = keyWord;
            $scope.onSearch();
        };
        
    }]);

