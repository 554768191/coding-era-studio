/**
 * Created by Yan on 15/12/22.
 */
"use strict";

angular.module('core')
    .directive('ceLoadingBar', ['LoadingBar', function(LoadingBar) {
        return {
            restrict: 'EA',
            templateUrl:'modules/core/views/templates/loadingbar.admin.template.html',

            controller:function($scope){
                $scope.urls = [];
                $scope.show = false;

                $scope.addUrls = function (url){
                    for(var i=0 ; i < $scope.urls.length ; i++){
                        if($scope.urls[i] === url){
                            return;
                        }
                    }
                    $scope.urls.splice($scope.urls.length,0,url);
                };

                $scope.removeUrls = function (url){
                    for(var i=0 ; i < $scope.urls.length ; i++) {
                        if ($scope.urls[i] === url) {
                            $scope.urls.splice(i, 1);
                        }
                    }
                };

                $scope.$watchCollection('urls',function(newValue,oldValue){
                    $scope.show = ($scope.urls.length !== 0);
                });
            },
            link: function(scope, el, attrs) {
                scope.$on('startLoading', function(event,url) {
                    scope.addUrls(url);
                });

                scope.$on('stopLoading', function(event,url) {
                    scope.removeUrls(url);
                });
            }
        };
    }]);