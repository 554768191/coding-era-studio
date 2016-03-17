/**
 * Created by Yan on 15/12/22.
 */
"use strict";

angular.module('core')
    .directive('ceLoadingBar', ['$rootScope', function($rootScope) {
        return {
            restrict: 'EA',
            templateUrl:'modules/core/views/templates/core.loadingbar.template.html',
            scope:{},
            controller:function($scope){
                $scope.urls = [];
                $scope.show = false;
                $scope.showLoading = function (){
                    $scope.show = true;
                };

                $scope.hideLoading = function (){
                    $scope.show = false;
                };
            },
            link: function(scope, el, attrs) {
                $rootScope.$on('startLoading', function(event,url) {
                    scope.showLoading();
                });

                $rootScope.$on('stopLoading', function(event,url) {
                   // scope.hideLoading();
                });
            }
        };
    }]);