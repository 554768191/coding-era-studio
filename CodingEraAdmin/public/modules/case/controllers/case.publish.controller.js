'use strict';

angular.module('case')

    .filter('propsFilter', function() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function(item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    })
    .controller('casePublishCtrl',['$scope','$log','$state','$stateParams','CaseService', 'ceUtil',
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
        var caseStr = JSON.stringify($scope.case);
        CaseService.saveCase($scope.case).success(function(res){
            ceUtil.toast('发布成功');
            $state.go('caseManage.list',{status:status});
        });
    };

    $scope.tagTransform = function (str){
        return {
            id:null,
            name:str
        };
    };

    $scope.itemArray = [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
        {id: 4, name: 'fourth'},
        {id: 5, name: 'fifth'},
    ];

    $scope.selected = { value: $scope.itemArray[0] };


           
}]);

