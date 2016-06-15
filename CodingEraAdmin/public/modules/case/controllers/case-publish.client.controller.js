'use strict';

angular.module('case').controller('casePublishCtrl',[
    '$scope','$log','$state','$stateParams','CaseService', 'ceUtil','TagService','$resource',
    function ($scope, $log,$state,$stateParams,CaseService,ceUtil,TagService,$resource){


        $scope.case = {};

        if(!angular.isUndefined($stateParams.caseId)){
             CaseService.getCaseById($stateParams.caseId).success(function (res) {
                $scope.case = res.data;
             });
        }

        //发布&保存
        $scope.onPublishClick = function(status){
            $scope.case.status = status;
            CaseService.saveCase($scope.case).success(function(res){
                ceUtil.toast('发布成功');
                $state.go('caseManage.list',{status:status});
            });
        };

        //录入新标签事件
        $scope.tagTransform = function (str){
            return {
                id:null,
                name:str
            };
        };

        //获取所有标签
        function getTageList(){
            TagService.getAllTags().success(function(res){
                $scope.itemArray = res.data;
            });
        }
        getTageList();
        $scope.itemArray = [];




    }
]);

