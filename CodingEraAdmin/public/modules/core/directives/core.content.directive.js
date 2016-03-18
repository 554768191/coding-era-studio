/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core').directive('ceContentView', ['$window',
    function($window) {
        var self={
            restrict:'C',
            link: function(scope, ele) {

                scope.onResize = function() {
                    var headHeight = angular.element(document.querySelector('.ce-head')).height();
                    var windowHeight = $window.innerHeight;
                    ele.css({height:windowHeight-headHeight+"px"});
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


        return self;
    }]);