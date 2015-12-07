/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core').directive('ceMenu', ['$window','$document',
    function($window) {
        var menu={
            restrict:'EA',
            templateUrl:'modules/core/views/templates/menu.admin.template.html',
            replace:true,
            link: function(scope, ele) {

                //todo 继续研究怎么获取head的高度,不应该写死高度
                var headHeight = 45;
                scope.onResize = function() {
                    var height = $window.innerHeight - headHeight;
                    ele.css({height:height+"px"});
                };
                scope.onResize();
                angular.element($window).bind('resize', function() {
                    scope.onResize();

                });
            }
        };
        return menu;
    }]);