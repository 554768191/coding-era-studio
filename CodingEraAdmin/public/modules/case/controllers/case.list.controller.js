'use strict';

angular.module('case').controller('caseListCtrl',['$scope','$log','$translate','$state','CasePublishService',
    'ceUtil',
function ($scope, $log,$translate,$state,CasePublishService,ceUtil){



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
             $scope.caseData = res.data;
        });
    };
    $scope.onSearch();


           
}]);

