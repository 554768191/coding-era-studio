/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core').directive('ceMenu', ['$window',
    function($window) {
        var menu={
            restrict:'EA',
            templateUrl:'modules/core/views/templates/menu.admin.template.html',
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
                    var height = $window.innerHeight - headHeight;
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
            }
        };


        return menu;
    }]);