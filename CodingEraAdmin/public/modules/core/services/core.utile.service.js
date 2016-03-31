/**
 * 请求事件
 */
"use strict";

angular.module('core')
    .factory('ceUtil', ['$rootScope','$templateCache','$uibModal','ceConfig',function($rootScope,$templateCache,$uibModal,ceConfig) {
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
                controller:[
                    '$scope','$uibModalInstance',
                    function($scope,$uibModalInstance){
                        $scope.message = message;
                        $scope.cancel = function(){
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.ok = function(){
                            $uibModalInstance.close();
                            successCallback();
                        };
                    }
                ]
            });



            return selfService;
        };

        service.loadingStatus = false;

        //show Loading
        service.loading = function(){

            service.loadingStatus = !service.loadingStatus;
            if(service.loadingStatus){
                $rootScope.$emit("startLoading");
            }else{
                $rootScope.$emit("stopLoading");
            }
        };

        //生成uuid
        service.genUuid = function() {
            var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var chars = CHARS, uuid = new Array(36), rnd=0, r;
            for (var i = 0; i < 36; i++) {
                if (i===8 || i===13 ||  i===18 || i===23) {
                    uuid[i] = '-';
                } else if (i===14) {
                    uuid[i] = '4';
                } else {
                    if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
                }
            }
            return uuid.join('');
        };

        //合并Page<Object>数据,loadMore加载更多使用
        service.loadMoreData = function (src,res){
            src.content = src.content.concat(res.data.content);
            src.first = res.data.first;
            src.last = res.data.last;
            src.number = res.data.number;
            return src;
        };


        service.initPageParameter = function(options){
            var option = {
                    page: ceConfig.page,//当前页
                    size: ceConfig.size,//每页大小
                    sort: null
            };
            angular.extend(option,options);
            return option;
        };



    return service;
} ]);