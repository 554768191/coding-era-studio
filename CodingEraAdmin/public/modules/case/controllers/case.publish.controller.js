'use strict';

angular.module('case').controller('casePublishCtrl',['$scope','$log','CasePublishService', 'ceUtil',
function ($scope, $log,CasePublishService,ceUtil){

    $scope.case = {};

    $scope.onPublishClick = function(){

        CasePublishService.saveCase($scope.case).success(function(res){
            ceUtil.toast('发布成功');
        });
    };


           
}]);

