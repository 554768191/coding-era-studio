/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core').directive('ceContentHead', ['$window','ContentHead','Authentication',
    function($window,ContentHead,Authentication) {
        var service={
            restrict:'EA',
            templateUrl:'modules/core/views/templates/core.content.head.template.html',
            scope:true,
            controller:['$scope','ContentHead',function($scope,ContentHead) {
                $scope.authentication = Authentication;
                $scope.title = ContentHead.getTitle();
                $scope.subTitle = ContentHead.getSubTitle();
            }],
            link: function(scope, el, attrs) {
                //加载成功后...
                scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
                    event.targetScope.$watch('$viewContentLoaded', function(){
                        //展示内容标题
                        var stateName = toState.name;
                        //2016-03-21嵌套菜单问题修正
                        var stateNameSplice = stateName.split('.');
                        if(stateNameSplice.length>1){
                            stateName = stateNameSplice[0];
                        }
                        ContentHead.autoRefreshTitle(stateName);
                    });
                });
            }
        };


        return service;
    }]);