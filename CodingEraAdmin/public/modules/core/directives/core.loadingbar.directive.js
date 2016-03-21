/**
 * Created by Yan on 15/12/22.
 */
"use strict";

angular.module('core')
    .directive('ceLoadingBar', ['$rootScope','$timeout', function($rootScope,$timeout) {
        return {
            restrict: 'EA',
            templateUrl:'modules/core/views/templates/core.loadingbar.template.html',
            scope:true,
            link: function(scope, el, attrs) {
                $rootScope.$on('startLoading', function() {
                    scope.show = true;
                    $timeout(function(){
                        scope.$apply();
                    });

                });

                $rootScope.$on('stopLoading', function() {
                    scope.show = false;
                    $timeout(function(){
                        scope.$apply();
                    });
                });
            }
        };
    }]);