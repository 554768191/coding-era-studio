/**
 * Created by Yan on 15/12/22.
 */
"use strict";

angular.module('core')
    .directive('ceLoadingBar', ['$rootScope', function($rootScope) {
        return {
            restrict: 'EA',
            templateUrl:'modules/core/views/templates/core.loadingbar.template.html',
            link: function(scope, el, attrs) {
                $rootScope.$on('startLoading', function() {
                    scope.show=true;
                    scope.$apply();
                });

                $rootScope.$on('stopLoading', function() {
                    scope.show=false;
                    scope.$apply();
                });
            }
        };
    }]);