'use strict';

angular.module('article').controller('articleListCtrl',['$scope','$log','$translate','$state','$stateParams','ArticleService',
    'ceUtil',
function ($scope, $log,$translate,$state,$stateParams,ArticleService,ceUtil){


    $scope.articleData = {};


    //分页参数
    var searchOptions = ceUtil.initPageParameter({
        status:$stateParams.status,
        keyWord:null
    });


    //搜索
    $scope.onSearch = function(){
        ArticleService.getArticles(searchOptions).success(function(res){
             $scope.articleData = res.data;
        });
    };
    $scope.onSearch();

    //编辑记录
    $scope.onEditClick = function(obj){
        $state.go('articleManage.publish',{articleId:obj.id});
    };

    //删除记录
    $scope.onDeleteClick = function(obj){
        ceUtil.confirmMessage('确认删除?').success(function(){
            ArticleService.deleteArticle({id:obj.id}).success(function(){
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

    //$scope.keyWords = '456';
    $scope.onSearchClick = function(keyWord){
        searchOptions.keyWord = keyWord;
        $scope.onSearch();
    };

           
}]);

