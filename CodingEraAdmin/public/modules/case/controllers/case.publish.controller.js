'use strict';

angular.module('case').controller('casePublishCtrl',['$scope','$log','$state','$stateParams','CaseService', 'ceUtil',
function ($scope, $log,$state,$stateParams,CaseService,ceUtil){


    $scope.case = {};

    if(!angular.isUndefined($stateParams.caseId)){
        CaseService.getCaseById($stateParams.caseId).success(function(res){
            $scope.case = res.data;
        });
    }


    //实时编译
    $scope.$watch('case.content',function(newValue,oldValue){
        if(newValue){
            $scope.case.maker = window.marked(newValue);
        }
    });

    $scope.onPublishClick = function(status){
        $scope.case.status = status;
        console.log($scope.case);
        //return;
        CaseService.saveCase($scope.case).success(function(res){
            ceUtil.toast('发布成功');
            $state.go('caseManage.list',{status:status});
        });
    };


           
}]);

