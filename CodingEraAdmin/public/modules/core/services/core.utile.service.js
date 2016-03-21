/**
 * 请求事件
 */
"use strict";

angular.module('core')
    .factory('ceUtil', ['$rootScope','$templateCache','$uibModal',function($rootScope,$templateCache,$uibModal) {
        var service = {};




        //弹出消息(默认5秒自动关闭)
        service.toast = function (message){
            //$rootScope.$emit("showToast",message);
            $rootScope.$emit("showToast",message);

        };

        //获取分页模板
        service.getPaginationTemplate = function(){
            var paginationScope = $rootScope.$new(true);
            var paginationTemplate = $templateCache.get('cePaginationTemplate');
           // $compile(paginationTemplate)(paginationScope);
            return paginationTemplate;
           // return $templateCache.get('cePaginationTemplate');
        };


        //模态消息对话框(确认,取消)
        service.confirmMessage = function(message){
            var self = this;
            var selfService ={};
            var successCallback = null;
            selfService.success = function(callback){
                successCallback =callback;
                return self;
            };

            var modalInstance = $uibModal.open({
                animation: true,
                size:'sm',
                templateUrl: '/modules/core/views/templates/core.confirm.view.html',
                controller: function($scope,$uibModalInstance){
                    $scope.message = message;
                    $scope.cancel = function(){
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.ok = function(){
                        $uibModalInstance.close();
                        successCallback();
                    };
                }
            });



            return selfService;
        };

        service.loadingStatus = false;

        service.loading = function(){

            service.loadingStatus = !service.loadingStatus;
            if(service.loadingStatus){
                $rootScope.$emit("startLoading");
            }else{
                $rootScope.$emit("stopLoading");
            }
        };



    return service;
} ]);