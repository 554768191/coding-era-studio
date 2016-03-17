'use strict';

angular.module('case').controller('casePublishCtrl',['$scope','$log','$state','CasePublishService', 'ceUtil',
function ($scope, $log,$state,CasePublishService,ceUtil){

    $scope.case = {};

    $scope.$watch('case.content',function(newValue,oldValue){
        //console.log(old,news);
        if(newValue){
            console.log(newValue);
            console.log(window.marked(newValue));
            $scope.case.maker = window.marked(newValue);
        }

    });

    $scope.onPublishClick = function(){

        CasePublishService.saveCase($scope.case).success(function(res){
            ceUtil.toast('发布成功');
            $state.go('caseManage.list');
        });
    };


           
}]);
