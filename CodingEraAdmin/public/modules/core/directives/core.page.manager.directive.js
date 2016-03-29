/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core')
    .factory('cePageManagerService',['$state',function($state){
        var service = {};



        service.titles = [];

        service.addTitle = function(objs){
            service.titles.splice(service.titles.length,0,objs);
        };

        service.getTitle = function (){
            var title = '';
            angular.forEach(service.titles,function(values){
                var bracketBefore = values.uiSref.indexOf('(');
                var bracketAfter = values.uiSref.indexOf(')');
                if(bracketBefore === -1){
                    if($state.is(values.uiSref)){
                        title = values.title;
                    }
                }else{
                    var parentUrl = values.uiSref.substring(0,bracketBefore);
                    var parameter = values.uiSref.substring(bracketBefore + 1,bracketAfter );
                    parameter = parameter.replace(/'/g, '"');
                    parameter = angular.fromJson(parameter);
                    if($state.is(parentUrl,parameter)){
                        title = values.title;
                    }
                }

            });


            return title;
        };


        return service;
    }])
    .directive('cePageManager', [
        function() {
            var self={
                restrict:'E',
                scope:true,
                transclude: true,
                template:['<div class="row ce-panel">',
                                '<div class="col-sm-3 " ng-transclude>',
                                '</div>',
                                '<div class="ce-panel-line col-sm-3 hidden-xs"></div>',
                                '<div class="col-sm-9">',
                                    '<div class="ce-panel-right" ui-view=""></div>',
                                '<div>',
                            '</div>',
                        ].join(''),
                link: function(scope, ele) {


                }
            };
        return self;
    }])
    .directive('cePageMenu', [
        function() {
            var self={
                restrict:'E',
                //scope:true,
                transclude: true,
                replace: true,
                template:'<div class="ce-panel-left" ng-transclude></div>',
                link: function(scope, ele) {


                }
            };
            return self;
        }])

    .directive('ceGroupLine', [
        function() {
            var self={
                restrict:'E',
                replace: true,
                template:'<div class="line"></div>',
                link: function(scope, ele) {

                }
            };
            return self;
        }])
    .directive('cePageBtn', ['$timeout','cePageManagerService',
        function($timeout,cePageManagerService) {
            var self={
                restrict:'E',
                replace: true,
                transclude: true,
                scope:{
                    ceIcon:'@',
                    ceClick:'&ceClick',
                    ceTitle:'@'
                },
                template:function (elem, attr){
                    if(attr.ceStyle==='btn'){
                        cePageManagerService.addTitle({title:attr.ceTitle,uiSref:attr.uiSref});
                        return '<button  class="btn btn-default ce-panel-left-btn"   ><span class="glyphicon {{ceIcon}}" aria-hidden="true"></span><span>{{ceTitle}}</span></button>';
                    }else if(attr.ceStyle === 'menu'){
                        cePageManagerService.addTitle({title:attr.ceTitle,uiSref:attr.uiSref});
                        return '<a  class="ce-panel-left-menu" ui-sref-active="active"  ui-sref-opts="{reload:true}" ><span class="glyphicon {{ceIcon}}" aria-hidden="true"></span><span>{{ceTitle}}</span></a>';
                    }else if(attr.ceStyle === 'search' ){
                        return ['<div class="input-group ce-panel-search">',
                                    '<input type="text" class="form-control" ng-model="ceModel"  placeholder="'+attr.placeholder+'" />',
                                    '<span class="input-group-btn">',
                                        '<button class="btn btn-default" ng-click="ceClick({keyWord:ceModel})" type="button"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>',
                                    '</span>',
                                '</div>',
                            ].join('');
                    }
                },
                compile: function (tElement, tAttrs){
                    return  function postlink(scope, ele,attr,ngModelCtrl) {

                    };
                }

            };
            return self;
        }])
    .directive('cePageHeader', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: ['$scope','cePageManagerService', function($scope,cePageManagerService) {
                $scope.title =cePageManagerService.getTitle();
            }],
            template: [
            '<div class="row ce-page-header">',
                '<div class="col-sm-8">',
                    '<div class="ce-page-header-title">',
                    '{{title}}',
                    '</div>',
                '</div>',
                '<div class="col-sm-4">',
                    '<div class="ce-page-header-bar" ng-transclude>',
                    '</div>',
                '</div>',
            '</div>',
            ].join('')
        };
    })
    .directive('ceSearchBar', function() {
        return {
            require: '^cePageHeader',
            restrict: 'E',
            transclude: true,
            scope: {
                cePlaceholder: '@',
                ceClick:'&'
            },
            link: function(scope, element, attrs, cePageHeader) {
                //cePageHeader.setSearchBar(scope);
            },
            template: [
                '<div class="input-group">',
                    '<input type="text" class="form-control" ng-model="keyWord" placeholder="{{cePlaceholder}}">',
                        '<span class="input-group-btn">',
                        '<button class="btn btn-default" type="button" ng-click="ceClick({keyWord:keyWord})"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>',
                    '</span>',
                '</div>',
            ].join('')
        };
    });