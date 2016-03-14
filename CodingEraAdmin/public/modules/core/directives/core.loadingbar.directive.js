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
                var time = null;
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

                $scope.$watchCollection('urls',function(){
                    if($scope.urls.length !== 0){
                        if(time === null){
                            time = setTimeout(function(){
                                $scope.$apply(function(){
                                    $scope.show = true;
                                });

                            },250);
                        }
                    }else{
                        clearTimeout(time);
                        time = null;
                        $scope.show = false;
                    }
                });
            },
            link: function(scope, el, attrs) {
                $rootScope.$on('startLoading', function(event,url) {
                    scope.addUrls(url);
                });

                $rootScope.$on('stopLoading', function(event,url) {
                    scope.removeUrls(url);
                });
            }
        };
    }]);