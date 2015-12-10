'use strict';

angular.module('demo').controller('demoCtrl',['$scope','$uibModal','$log','DemoService',
function ($scope, $uibModal, $log,DemoService){

    $scope.onSearch = function(e){
        $log.log(123);
        console.log(CeConfig);
    };


    $scope.demoData = DemoService.query();


    $scope.gridOptions = {
        enableSorting: true,
        data:'demoData.data.content',
        columnDefs: [
            { name: 'name', enableSorting: false },
            { name: 'remark' }
        ]
    };
           
}]);

