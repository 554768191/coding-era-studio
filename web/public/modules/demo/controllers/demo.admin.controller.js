'use strict';

angular.module('demo').controller('demoCtrl',['$scope','$uibModal','$log','DemoService',
function ($scope, $uibModal, $log,DemoService){

    $scope.onSearch = function(e){
        $log.log(123);
        $log.log(CeConfig);
    };






    var paginationOptions = {
        page: 0,//当前页
        size: 10,//每页大小
        sort: null //排序(没做!!!!)
    };

    $scope.demoData = DemoService.query(paginationOptions,function(res){
        //暂时只知道..这里才能正确告诉gridOptions多少页
        $scope.gridOptions.totalItems = res.data.totalPages;
    });

    $scope.gridOptions = {
        data:'demoData.data.content',//就是页面的$scope.demoData
        paginationPageSizes: [10, 20, 50],//每页显示多少
        paginationPageSize: 10,//当前显示多少页
        useExternalPagination:true,//不用默认的分页控制器
        columnDefs: [//这个不解释了,你懂的
            { name: 'name',displayName:'名称' },
            { name: 'remark',displayName:'备注' }
        ],
        onRegisterApi: function(gridApi) {
            //分页发生改变
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                paginationOptions.page = newPage - 1;//默认-1,我们service从0页开始,看看springMvc能不能配置吧
                paginationOptions.size = pageSize;
                //重新查询demoData数据
                $scope.demoData=DemoService.query(paginationOptions);
            });
        }
    };


           
}]);

