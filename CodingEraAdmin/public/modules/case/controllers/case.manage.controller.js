'use strict';

angular.module('case').controller('caseManageCtrl',['$scope','$log','$state',
    'ceUtil',
function ($scope, $log,$state){

    $state.go('caseManage.list');

    //点击发布按钮
    $scope.onShowPublishViewClick = function (){
       $state.go('caseManage.publish');
    };


           
}]);

