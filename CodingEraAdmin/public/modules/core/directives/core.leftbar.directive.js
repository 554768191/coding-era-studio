/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core').directive('ceLeftbar', ['$window',
    function($window) {
        var leftbar={
            restrict:'C',
            link: function(scope, ele) {

                scope.onResize = function() {
                    var headHeight = angular.element(document.querySelector('.ce-menu')).height();
                    ele.css({height:headHeight+"px"});

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


        return leftbar;
    }]);