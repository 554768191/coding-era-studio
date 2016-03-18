'use strict';

angular.module('case').controller('casePublishCtrl',['$scope','$log','$state','CaseService', 'ceUtil',
function ($scope, $log,$state,CaseService,ceUtil){

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

        CaseService.saveCase($scope.case).success(function(res){
            ceUtil.toast('发布成功');
            $state.go('caseManage.list');
        });
    };


           
}]);

