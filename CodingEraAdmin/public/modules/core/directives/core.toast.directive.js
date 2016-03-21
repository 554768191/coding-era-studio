/**
 * Created by Yan on 15/12/22.
 */
"use strict";

angular.module('core')
    .directive('ceToast', ['$rootScope','$timeout','$uibPosition','ceUtil', function($rootScope,$timeout,$uibPosition,ceUtil) {
        return {
            restrict: 'EA',
            templateUrl:'modules/core/views/templates/core.toast.template.html',
            replace:true,
            scope:true,
            link: function(scope, el, attrs) {
                //菜单宽度

                $rootScope.$on('showToast', function(event,message) {
                    scope.message = message;
                    el.css('opacity','1.0');
                    $timeout(function(){
                        scope.$apply();
                    });

                    setTimeout(function(){
                        $rootScope.$emit('hideToast');
                    },3000);
                });

                $rootScope.$on('hideToast', function(event) {
                    scope.$apply(function(){
                        el.css('opacity','0.0');
                    });
                });
            }
        };
    }]);