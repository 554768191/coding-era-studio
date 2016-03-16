'use strict';

angular.module('case').controller('casePublishCtrl',['$scope','$log','$translate','ceConfig','CasePublishService',
    'CeUtil',
function ($scope, $log,$translate,ceConfig,CasePublishService){

    $scope.case = {};

    $scope.onPublishClick = function(){
        CasePublishService.save($scope.case);
    };


           
}]);

