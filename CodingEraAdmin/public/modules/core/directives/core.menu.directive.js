/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core').directive('ceMenu', ['$window','Menus',
    function($window,Menus) {
        var menu={
            restrict:'EA',
            templateUrl:'modules/core/views/templates/core.menu.template.html',
            replace:true,
            controller:function($scope, $log,Menus) {
                $scope.items=Menus.getMenus();
                $scope.onShowNode=function(item){
                    item.show=!item.show;
                };
            },
            link: function(scope, ele) {
                var headHeight = angular.element(document.querySelector('.ce-head')).height();
                scope.onResize = function() {
                    var contentHeight = angular.element(document.querySelector('.ce-content')).height();
                    var height = $window.innerHeight;
                    if(contentHeight > height){
                        ele.css({height:contentHeight+"px"});
                    }else{
                        ele.css({height:height+"px"});
                    }
                };
                scope.onResize();
                angular.element($window).bind('resize', function() {
                    scope.onResize();
                });
                angular.element($window).bind('scroll', function() {
                    scope.onResize();
                });

                scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
                    event.targetScope.$watch('$viewContentLoaded', function(){
                        //展开当前菜单
                        Menus.expandMenuByRoute(toState.name);
                    });
                });
            }
        };


        return menu;
    }]);