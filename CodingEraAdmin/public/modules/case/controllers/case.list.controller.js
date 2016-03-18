'use strict';

angular.module('case').controller('caseListCtrl',['$scope','$log','$translate','$state','CaseService',
    'ceUtil',
function ($scope, $log,$translate,$state,CaseService,ceUtil){



    $scope.caseData = {};

    //分页参数
    var searchOptions = {
        page: 0,//当前页
        size: 10,//每页大小
        sort: null //排序(没做!!!!)
    };

    //搜索
    $scope.onSearch = function(){
        CaseService.getCases(searchOptions).success(function(res){
             $scope.caseData = res.data;
        });
    };
    $scope.onSearch();


    $scope.onDeleteClick = function(id){
        ceUtil.confirmMessage('确认删除?').success(function(){
            CaseService.deleteCase({id:id}).success(function(){
                ceUtil.toast('删除成功');
                $scope.onSearch();
            });
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

           
}]);

