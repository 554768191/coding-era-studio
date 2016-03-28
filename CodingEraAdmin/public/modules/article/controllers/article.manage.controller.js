'use strict';

angular.module('article').controller('articleManageCtrl',['$scope','$log','$state',
    'ceUtil',
function ($scope, $log,$state){
    //默认加载'所有已发布作品'
   if($state.is('articleManage')){
       $state.go('articleManage.list',{status:'PUBLISHED'});
   }
    //$scope.keyWords = '456';
    $scope.onSearchClick = function(keyWord){
      console.log(keyWord);
    };
}]);

