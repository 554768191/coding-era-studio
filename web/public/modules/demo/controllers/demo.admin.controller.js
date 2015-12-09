'use strict';

angular.module('demo').controller('demoCtrl',['$scope','$uibModal','$log','DemoService',
function ($scope, $uibModal, $log,DemoService){

    $scope.onSearch = function(e){
        $log.log(123);
        console.log(CeConfig);
    };


    $scope.demoData = DemoService.query();
    console.log($scope.demoData);
    $scope.myData = [
        {
            "firstName": "Cox",
            "lastName": "Carney",
            "company": "Enormo",
            "employed": true
        },
        {
            "firstName": "Lorraine",
            "lastName": "Wise",
            "company": "Comveyer",
            "employed": false
        },
        {
            "firstName": "Nancy",
            "lastName": "Waters",
            "company": "Fuelton",
            "employed": false
        }
    ];

    $scope.gridOptions = {
        enableSorting: true,
        data:'myData',
        columnDefs: [
            { name: 'firstName', enableSorting: false },
            { name: 'lastName' },
            { name: 'company' },
            { name : 'employed'}
        ]
    };
           
}]);

