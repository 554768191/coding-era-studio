/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core').directive('ceMenu', ['$window','$state','Menus', 'Authentication',
    function($window,$state, Menus, Authentication) {
        var menu={
            restrict:'EA',
            templateUrl:'modules/core/views/templates/core.menu.template.html',
            replace:true,
            controller:['$scope', '$log', 'Menus', 'Authentication',function($scope, $log, Menus, Authentication) {
                $scope.authentication=Authentication;
                $scope.items=Menus.getMenus();
                $scope.onShowNode=function(item){
                    item.show=!item.show;
                };
            }],
            link: function(scope, ele) {
                var headHeight = angular.element(document.querySelector('.ce-head')).height();
                scope.onResize = function() {
                    var contentHeight = angular.element(document.querySelector('.ce-content')).height();
                    var height = $window.innerHeight;
                    if(contentHeight > height){
                        ele.css({height:contentHeight+"px"});
                    }else{
                        ele.css({height:height - headHeight+"px"});
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
                        var stateName = toState.name;
                        //2016-03-21嵌套菜单问题修正
                        var stateNameSplice = stateName.split('.');
                        if(stateNameSplice.length>1){
                            stateName = stateNameSplice[0];
                        }
                        Menus.expandMenuByRoute(stateName);
                    });
                });
            }
        };


        return menu;
    }]);