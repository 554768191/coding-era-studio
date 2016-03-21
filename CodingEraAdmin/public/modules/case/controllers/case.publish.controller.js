'use strict';

angular.module('case').controller('casePublishCtrl',['$scope','$log','$state','$stateParams','CaseService', 'ceUtil',
function ($scope, $log,$state,$stateParams,CaseService,ceUtil){


    $scope.case = {};

    if(!angular.isUndefined($stateParams.caseId)){
        console.log($stateParams.caseId);
        CaseService.getCaseById($stateParams.caseId).success(function(res){
            $scope.case = res.data;
        });
    }



    $scope.$watch('case.content',function(newValue,oldValue){

        //console.log(old,news);
        if(newValue){
            console.log(newValue);
            console.log(window.marked(newValue));
            $scope.case.maker = window.marked(newValue);
        }

    });

    $scope.onPublishClick = function(status){
        $scope.case.status = status;
        CaseService.saveCase($scope.case).success(function(res){
            ceUtil.toast('发布成功');
            $state.go('caseManage.list',{status:status});
        });
    };


           
}]);

