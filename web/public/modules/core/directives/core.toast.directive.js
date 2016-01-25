/**
 * Created by Yan on 15/12/22.
 */
"use strict";

angular.module('core')
    .directive('ceToast', ['$rootScope','$timeout','$uibPosition','CeUtil', function($rootScope,$timeout,$uibPosition,CeUtil) {
        return {
            restrict: 'EA',
            templateUrl:'modules/core/views/templates/core.toast.template.html',
            replace:true,
            scope:{
                show:'@'
            },
            controller:function($scope){
                $scope.message = '';
                $scope.style ='';
            },
            link: function(scope, el, attrs) {
                //菜单宽度

                scope.$watch(function(){
                    return el[0].clientWidth;
                }, function(value) {
                    //基于屏幕居中(如果基于内容居中,会非常别扭)
                    el.css('margin-left',value / 2 * -1  + 'px');
                });

                $rootScope.$on('showToast', function(event,message) {
                    scope.message = message;
                    el.css('opacity','1.0');
                    setTimeout(function(){
                        $rootScope.$emit('hideToast');
                    },2000);
                });

                $rootScope.$on('hideToast', function(event) {
                    scope.$apply(function(){
                        el.css('opacity','0.0');
                    });
                });
            }
        };
    }]);