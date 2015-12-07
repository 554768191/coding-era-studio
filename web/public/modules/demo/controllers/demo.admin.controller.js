'use strict';

angular.module('demo').controller('demoCtrl',['$scope','$uibModal','$log',function ($scope, $uibModal, $log){

    $scope.onSearch = function(e){
      alert(123);
    };

    $scope.gridOptions = {
        enableSorting: true,
        columnDefs: [
            { name: 'field1', enableSorting: false },
            { name: 'field2' },
            { name: 'field3', visible: false }
        ]
    };
           
}]);

