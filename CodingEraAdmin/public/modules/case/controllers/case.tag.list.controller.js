'use strict';

angular.module('case').controller('tagListCtrl', [
    '$scope', '$log', '$translate', '$uibModal', 'path', 'TagService', 'ceUtil',
    function ($scope, $log, $translate, $uibModal, path, TagService, ceUtil) {

        $scope.selectedData = null;
        $scope.isSelected = false;

        $scope.onEditClick = function (data) {
            var tag = data;
            if(data == null){
                if($scope.isSelected == false){
                    ceUtil.toast('请选中一行数据');
                    return;
                }
                tag = $scope.selectedData;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/case/views/case.tag.edit.view.html',
                controller: 'tagEditCtrl',
                resolve: {
                    tag: function () {
                        return tag;
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
            var tag = data;
            if(data == null){
                if($scope.isSelected == false){
                    ceUtil.toast('请选中一行数据');
                    return;
                }
                tag = $scope.selectedData;
            }

            TagService.deleteTag(tag).success(function () {
                $scope.onSearch();
            });
        };

        $scope.onCreateClick = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/case/views/case.tag.edit.view.html',
                controller: 'tagEditCtrl',
                resolve: {
                    tag: function () {
                        return {};
                    }
                }
            });
            //点击确定返回
            modalInstance.result.then(function () {
                //保存成功,刷新
                $scope.onSearch();
            });
        };

        //Grid data
        $scope.tagData = {};

        //分页参数
        $scope.searchOptions = {
            keyWord:123,

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
            data: 'tagData.data.content',//就是页面的$scope.tagData
            paginationPageSizes: [10, 20, 50],//每页显示多少
            paginationPageSize: 10,//当前显示多少页
            useExternalPagination: true,//不用默认的分页控制器
            rowHeight:40,
            animate: false,
            columnDefs: [
                {name: 'name', displayName: '标签名称', allowCellFocus: true},
                {name: 'type', displayName: '类型'},
                {name: 'hot', displayName: '热度'},
                {
                    name: 'ShowScope',
                    displayName: 'Actions',
                    cellTemplate: '<div class="btn-group-sm">' +
                    '<button class="btn btn-info" ng-click="grid.appScope.onEditClick(row.entity)">编辑</button>' +
                    '<button class="btn btn-danger" ng-click="grid.appScope.onDeletedClick(row.entity)">删除</button>' +
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
                    //重新查询tagData数据
                    $scope.onSearch();
                });
            }
        };

        //搜索
        $scope.onSearch = function () {
            TagService.getTags($scope.searchOptions).success(function (res) {
                $scope.tagData = res;
                $scope.gridOptions.totalItems = res.data.totalElements;
            });
        };
        //init query
        $scope.onSearch();

    }]);

