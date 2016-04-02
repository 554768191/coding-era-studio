'use strict';

angular.module('case').controller('caseListCtrl',[
    '$scope','$log','$translate','$state','$stateParams','CaseService', 'ceUtil',
function ($scope, $log,$translate,$state,$stateParams,CaseService,ceUtil){


    $scope.caseData = {};

    var searchOptions = ceUtil.initPageParameter({
        status:$stateParams.status,
        keyWord:null
    });

    //搜索
    $scope.onSearch = function(){
        CaseService.getCases(searchOptions).success(function(res){
             $scope.caseData = res.data;
        });
    };
    $scope.onSearch();

    //编辑记录
    $scope.onEditClick = function(obj){
        $state.go('caseManage.publish',{caseId:obj.id});
    };

    //删除记录
    $scope.onDeleteClick = function(obj){
        ceUtil.confirmMessage('确认删除?').success(function(){
            CaseService.deleteCase({id:obj.id}).success(function(){
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

    $scope.onSearchClick = function(keyWord){
        searchOptions.keyWord = keyWord;
        $scope.onSearch();
    };

           
}]);

