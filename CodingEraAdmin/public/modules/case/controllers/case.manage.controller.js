'use strict';

angular.module('case').controller('caseManageCtrl',['$scope','$log','$translate','$state','CasePublishService',
    'ceUtil',
function ($scope, $log,$translate,$state,CasePublishService,ceUtil){

    $state.go('caseManage.list');

    //点击发布按钮
    $scope.onShowPublishViewClick = function (){
       $state.go('caseManage.publish');
    };

    $scope.caseData = {};

    //分页参数
    var searchOptions = {
        page: 0,//当前页
        size: 10,//每页大小
        sort: null //排序(没做!!!!)
    };

    //搜索
    $scope.onSearch = function(){
         CasePublishService.getCases(searchOptions).success(function(res){
             $scope.caseData = res;
             console.log($scope.caseData);
             $scope.gridOptions.totalItems = res.data.totalElements;
        });
    };
    $scope.onSearch();

    //grid配置
    $scope.gridOptions = {
        gridMenuTitleFilter: $translate,
        data:'caseData.data.content',//就是页面的$scope.demoData
        paginationPageSizes: [10, 20, 50],//每页显示多少
        paginationPageSize: 10,//当前显示多少页
        useExternalPagination:true,//不用默认的分页控制器
        animate:false,
        columnDefs: [//这个不解释了,你懂的
            { name: 'title',displayName:'作品名称' },
            { name:'content',displayName:'test'}
        ],
        paginationTemplate:ceUtil.getPaginationTemplate(),
        onRegisterApi: function(gridApi) {
            //分页发生改变
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                searchOptions.page = newPage - 1;//默认-1,我们service从0页开始,看看springMvc能不能配置吧
                searchOptions.size = pageSize;
                //重新查询demoData数据
                //$scope.demoData=DemoService.query(searchOptions);
                $scope.onSearch();
            });
        }
    };
           
}]);

