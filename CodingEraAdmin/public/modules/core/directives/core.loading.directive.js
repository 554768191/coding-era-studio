/**
 * Created by Yan on 15/12/22.
 */
"use strict";

angular.module('core')
    .directive('ceUiButterbar', ['$rootScope', '$anchorScroll', function($rootScope, $anchorScroll) {
        return {
            restrict: 'AC',
            template:'<span class="bar"></span>',
            link: function(scope, el, attrs) {
                el.addClass('butterbar hide');
                scope.$on('$stateChangeStart', function(event) {
                    $anchorScroll();
                    el.removeClass('hide').addClass('active');
                });
                scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
                    event.targetScope.$watch('$viewContentLoaded', function(){
                        el.addClass('hide').removeClass('active');
                    });
                });

            }
        };
    }])
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