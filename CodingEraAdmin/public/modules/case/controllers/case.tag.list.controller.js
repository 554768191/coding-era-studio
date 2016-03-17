'use strict';

angular.module('case').controller('tagListCtrl', ['$scope', '$log', '$translate', '$uibModal', 'path', 'TagService',
    'ceUtil',
    function ($scope, $log, $translate, $uibModal, path, TagService, ceUtil) {

        $scope.onDeletedClick = function () {
            console.log(path);
            ceUtil.toast('测试');
        };

        $scope.onCreateClick = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/case/views/case.tag.edit.view.html',
                controller: 'tagEditCtrl',
                resolve: {}
            });

            //点击确定返回
            modalInstance.result.then(function () {
                //保存成功,刷新
                $scope.onSearch();
            });
        };

        $scope.tagData = {};

        //分页参数
        var searchOptions = {
            page: 0,//当前页
            size: 10,//每页大小
            sort: null //排序(没做!!!!)
        };

        //搜索
        $scope.onSearch = function () {
            TagService.getTags(searchOptions).success(function (res) {
                $scope.tagData = res;
                console.log($scope.tagData);
                $scope.gridOptions.totalItems = res.data.totalElements;
            });
        };

        //grid配置
        $scope.gridOptions = {
            gridMenuTitleFilter: $translate,
            data: 'tagData.data.content',//就是页面的$scope.tagData
            paginationPageSizes: [10, 20, 50],//每页显示多少
            paginationPageSize: 10,//当前显示多少页
            useExternalPagination: true,//不用默认的分页控制器
            animate: false,
            columnDefs: [
                {name: 'name', displayName: '标签名称'},
                {name: 'type', displayName: '类型'}
            ],
            paginationTemplate: ceUtil.getPaginationTemplate(),
            onRegisterApi: function (gridApi) {
                //分页发生改变
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    searchOptions.page = newPage - 1;//默认-1,我们service从0页开始,看看springMvc能不能配置吧
                    searchOptions.size = pageSize;
                    //重新查询tagData数据
                    //$scope.tagData=DemoService.query(searchOptions);
                    $scope.onSearch();
                });
            }
        };

    }]);

