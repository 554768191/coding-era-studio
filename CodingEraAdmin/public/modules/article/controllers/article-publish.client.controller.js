'use strict';

angular.module('article').controller('articlePublishCtrl',[
    '$scope','$log','$state','$stateParams','ArticleService', 'ceUtil','TagService','Authentication',
function ($scope, $log,$state,$stateParams,ArticleService,ceUtil,TagService,Authentication){


    $scope.article = {};

    if(!angular.isUndefined($stateParams.articleId)){
        ArticleService.getArticleById($stateParams.articleId).success(function(res){
            $scope.article = res.data;
        });
    }

    //发布&保存
    $scope.onPublishClick = function(status){
        $scope.article.status = status;

        //如果是体验用户,提示用户没有权限,不隐藏按钮(一切为了展示)
        Authentication.isNotGuest(function(){
            ArticleService.saveArticle($scope.article).success(function(res){
                ceUtil.toast('发布成功');
                $state.go('articleManage.list',{status:status});
            });
        });
    };

    //录入新标签事件
    $scope.tagTransform = function (str){
        return {
            id:null,
            name:str
        };
    };

    //获取所有标签
    function getTageList(){
        TagService.getAllTags().success(function(res){
            $scope.itemArray = res.data;
        });
    }
    getTageList();
    $scope.itemArray = [];



           
}]);

