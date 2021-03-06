'use strict';

angular.module('demo').controller('demoCtrl',[
    '$scope','$uibModal','$log','DemoService','ceConfig','path', 'ceUtil',
function ($scope, $uibModal, $log,DemoService,ceConfig,path,ceUtil){

    $scope.demoData = {};

    $scope.keyWord = '';

    //分页参数
    var searchOptions = {
        page: 0,//当前页
        size: 10,//每页大小
        sort: null //排序(没做!!!!)
    };

    //搜索
    $scope.onSearch = function(){
        $scope.demoData = DemoService.query(searchOptions,function(res){
            //暂时只知道..这里才能正确告诉gridOptions多少页
            $scope.gridOptions.totalItems = res.data.totalElements;
        });
    };
    //加载时默认搜索一次
    //$scope.onSearch();


    $scope.onDeletedClick = function(){
        ceUtil.toast('测试');
    };

    $scope.onCreateClick = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: path+'/views/demo-edit.client.view.html',
            controller: 'demoEditCtrl',
            resolve: {

            }
        });

        //点击确定返回
        modalInstance.result.then(function () {
            //保存成功,刷新
            $scope.onSearch();
        });
    };

    //搜索按钮点击
    $scope.onSearchClick = function(){
        searchOptions.page = 0;//默认-1,我们service从0页开始,看看springMvc能不能配置吧
        $scope.onSearch();
    };


    //监视keyWord值改变
    $scope.$watch('keyWord',function(){
        searchOptions.keyWord = $scope.keyWord;
    });






           
}]);

