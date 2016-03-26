'use strict';

angular.module('case').controller('commentListCtrl', [
    '$scope', '$log', '$translate', '$interval', '$uibModal', 'path', 'CommentService', 'ceUtil',
    function ($scope, $log, $translate, $interval, $uibModal, path, CommentService, ceUtil) {

        $scope.selectedData = null;
        $scope.isSelected = false;

        $scope.onEditClick = function (data) {
            var comment = data;
            if(!comment){
                if($scope.isSelected === false){
                    ceUtil.toast('请选中一行数据');
                    return;
                }
                comment = $scope.selectedData;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/case/views/case.comment.edit.view.html',
                controller: 'commentEditCtrl',
                resolve: {
                    comment: function () {
                        return comment;
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
            var comment = data;
            if(!comment){
                if($scope.isSelected === false){
                    ceUtil.toast('请选中一行数据');
                    return;
                }
                comment = $scope.selectedData;
            }

            CommentService.deleteComment(comment).success(function () {
                $scope.onSearch();
            });
        };

        $scope.onCreateClick = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/case/views/case.comment.edit.view.html',
                controller: 'commentEditCtrl',
                resolve: {
                    comment: function () {
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

        //分页参数
        $scope.searchOptions = {
            keyWord:'',

            page: 0,//当前页
            size: 10,//每页大小
            sort: null //排序(没做!!!!)
        };

        //Grid配置
        var baseOptions = {
            enableFullRowSelection: true,//行选择
            enableRowSelection: true,//框选择
            enableRowHeaderSelection: false,//显示选择框
            selectionRowHeaderWidth: 35,
            multiSelect: false,
            gridMenuTitleFilter: $translate,
            paginationPageSizes: [10, 20, 50],//每页显示多少
            paginationPageSize: 10,//当前显示多少页
            useExternalPagination: true,//不用默认的分页控制器
            //rowHeight: 40,
            animate: false,
            columnDefs: [
                {name: 'parentId', displayName: '父节点'},
                {name: 'title', displayName: '标题', allowCellFocus: true},
                {name: 'content', displayName: '内容'},
                {name: 'hasChildren', displayName: '回复数', cellTemplate:'<p class="ui-grid-cell-contents text-right">{{row.entity.hasChildren}}</p>'},
                {name: 'userName', displayName: '评论人'},
                {name: 'createdTime', displayName: '评论时间'},
                {name: 'userId', displayName: '文章'},
                {name: 'status', displayName: '状态'},
                //{
                //    name: 'ShowScope',
                //    displayName: '操作',
                //    cellTemplate: '<div class="btn-group-sm">' +
                //    '<button class="btn btn-info" ng-click="grid.appScope.onEditClick(row.entity)">详情</button>' +
                //    '<button class="btn btn-danger" ng-click="grid.appScope.onDeletedClick(row.entity)">置顶</button>' +
                //    '<button class="btn btn-danger" ng-click="grid.appScope.onDeletedClick(row.entity)">通过</button>' +
                //    '<button class="btn btn-danger" ng-click="grid.appScope.onDeletedClick(row.entity)">屏蔽</button>' +
                //    '</div>'
                //}
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
                    //重新查询commentData数据
                    $scope.onSearch();
                });
            }
        };

        $scope.gridOptions = angular.extend(angular.copy(baseOptions), {
            onRegisterApi: function (gridApi) {
                baseOptions.onRegisterApi(gridApi);
                // tree view
                gridApi.treeBase.on.rowExpanded($scope, function(row, a) {
                    //row.entity.$$hashKey === $scope.gridOptions.data[50].$$hashKey &&
                    if(row.entity.index ===0 ) {
                        $interval(function() {
                            $scope.gridOptions.data.splice(row.entity.index + 1,0,
                                {title: 'Dynamic 1', gender: 'female', age: 53, company: 'Griddable grids', balance: 38000, $$treeLevel: 1},
                                {title: 'Dynamic 2', gender: 'male', age: 18, company: 'Griddable grids', balance: 29000, $$treeLevel: 1}
                            );
                        }, 2000, 1);
                    }
                });
            }
        });

        $scope.gridOptions2 = angular.extend(angular.copy(baseOptions),  {
            expandableRowTemplate: 'modules/case/views/templates/expandableRowTemplate.html',
            expandableRowScope:{
                onEditClick:$scope.onEditClick
            },
            onRegisterApi: function (gridApi2) {
                baseOptions.onRegisterApi(gridApi2);
                // expand template view
                gridApi2.expandable.on.rowExpandedStateChanged($scope, function (row) {

                    if (row.isExpanded) {
                        row.entity.subGridOptions = angular.extend(angular.copy($scope.gridOptions2),  {
                            enablePaginationControls: false,
                            showHeader:false
                        });
                        row.entity.subGridOptions.data = [
                            //{title: 'Dynamic 1', gender: 'female', age: 53, company: 'Griddable grids', balance: 38000, $$treeLevel: 1},
                            //{title: 'Dynamic 2', gender: 'male', age: 18, company: 'Griddable grids', balance: 29000, $$treeLevel: 1}
                        ];
                        if(row.entity.hasChildren === 0){
                            return;
                        }
                        CommentService.getComments({parentId:row.entity.id}).success(function (res) {
                            angular.forEach(res.data.content, function (value, key) {
                                value.index = key;
                                value.$$treeLevel = 0;
                            });
                            row.entity.subGridOptions.data = res.data.content;
                        });
                    }
                });
            }
        });

        //搜索
        $scope.onSearch = function () {
            CommentService.getRootComments($scope.searchOptions).success(function (res) {
                angular.forEach(res.data.content, function (value, key) {
                    value.index = key;
                    value.$$treeLevel = 0;
                });
                $scope.gridOptions.data = res.data.content;
                $scope.gridOptions.totalItems = res.data.totalElements;

                $scope.gridOptions2.data = res.data.content;
                $scope.gridOptions2.totalItems = res.data.totalElements;
            });
        };
        //init query
        $scope.onSearch();

        $scope.getTableStyle= function() {
            var marginHeight = 100; // optional
            //var length = $('img:visible').length; // this is unique to my cellTemplate
            var height = ($scope.gridOptions2.data.length * $scope.gridOptions2.rowHeight + $scope.gridOptions2.headerRowHeight + marginHeight ) + "px";
            return {
                height: height
            };
        };

    }]);

