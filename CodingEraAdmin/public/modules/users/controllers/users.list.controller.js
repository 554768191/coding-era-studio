'use strict';

angular.module('users').controller('usersListCtrl', [
    '$scope', '$log', '$translate', '$uibModal', '$location', 'path', 'UserService', 'ceUtil',
    function ($scope, $log, $translate, $uibModal, $location, path, UserService, ceUtil) {

        $scope.selectedData = null;
        $scope.isSelected = false;

        $scope.onEditClick = function (data) {
            var user = data;
            if(!user){
                if($scope.isSelected === false){
                    ceUtil.toast('请选中一行数据');
                    return;
                }
                user = $scope.selectedData;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/case.user.edit.view.html',
                controller: 'userEditCtrl',
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            });
            //点击确定返回
            modalInstance.result.then(function () {
                //保存成功,刷新
                $scope.onSearch();
            });
        };

        $scope.onDeletedClick = function (data) {
            var user = data;
            if(!user){
                if($scope.isSelected === false){
                    ceUtil.toast('请选中一行数据');
                    return;
                }
                user = $scope.selectedData;
            }

            UserService.deleteUser(user).success(function () {
                $scope.onSearch();
            });
        };

        $scope.onCreateClick = function () {
            $location.path('/user/signup');
        };

        //Grid data
        $scope.userData = {};

        //分页参数
        $scope.searchOptions = {
            keyWord:'',

            page: 0,//当前页
            size: 10,//每页大小
            sort: null //排序(没做!!!!)
        };

        //rid配置
        $scope.gridOptions = {

            enableFullRowSelection: true,//行选择
            enableRowSelection: true,//框选择
            enableRowHeaderSelection: false,//显示选择框
            selectionRowHeaderWidth: 35,
            multiSelect: false,

            gridMenuTitleFilter: $translate,
            data: 'userData.data.content',//就是页面的$scope.userData
            paginationPageSizes: [10, 20, 50],//每页显示多少
            paginationPageSize: 10,//当前显示多少页
            useExternalPagination: true,//不用默认的分页控制器
            rowHeight:40,
            animate: false,
            columnDefs: [
                {name: 'displayName', displayName: '昵称', allowCellFocus: true},
                {name: 'username', displayName: '登录名'},
                {name: 'sex', displayName: '性别'},
                {name: 'type1', displayName: '头像'},
                {name: 'email', displayName: '邮箱'},
                {name: 'phone', displayName: '手机'},
                {name: 'enable', displayName: '状态'},
                {
                    name: 'ShowScope',
                    displayName: 'Actions',
                    cellTemplate: '<div class="btn-group-sm">' +
                    '<button class="btn btn-info" ng-click="grid.appScope.onDeletedClick(row.entity)">角色</button>' +
                    '<button class="btn btn-danger" ng-click="grid.appScope.onDeletedClick(row.entity)">禁用</button>' +
                    '</div>'
                }
            ],
            paginationTemplate: ceUtil.getPaginationTemplate(),
            onRegisterApi: function (gridApi) {
                //set gridApi on scope
                $scope.gridApi = gridApi;
                //选中事件
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    $scope.isSelected = row.isSelected;
                    $scope.selectedData = row.entity;
                });
                //分页发生改变
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    $scope.searchOptions.page = newPage - 1;//默认-1,我们service从0页开始,看看springMvc能不能配置吧
                    $scope.searchOptions.size = pageSize;
                    //重新查询userData数据
                    $scope.onSearch();
                });
            }
        };

        //搜索
        $scope.onSearch = function () {
            UserService.getUsers($scope.searchOptions).success(function (res) {
                $scope.userData = res;
                $scope.gridOptions.totalItems = res.data.totalElements;
            });
        };
        //init query
        $scope.onSearch();

    }]);

