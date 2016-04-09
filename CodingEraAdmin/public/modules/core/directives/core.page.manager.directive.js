/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core')
    .factory('cePageManagerService',['$state',function($state){
        var service = {};



        service.subNavis = [];

        service.addSubNavi = function(objs){
            service.subNavis.splice(service.subNavis.length,0,objs);
        };

        service.getSubNavi = function (){
            var navi = {};
            angular.forEach(service.subNavis,function(values){
                if(!angular.isUndefined(values.uiSref)){
                    var bracketBefore = values.uiSref.indexOf('(');
                    var bracketAfter = values.uiSref.indexOf(')');
                    if(bracketBefore === -1){
                        if($state.is(values.uiSref)){
                            navi = values;
                        }
                    }else{
                        var parentUrl = values.uiSref.substring(0,bracketBefore);
                        var parameter = values.uiSref.substring(bracketBefore + 1,bracketAfter );
                        parameter = parameter.replace(/'/g, '"');
                        parameter = angular.fromJson(parameter);
                        if($state.is(parentUrl,parameter)){
                            navi = values;
                        }
                    }
                }

            });


            return navi;
        };


        return service;
    }])
    .directive('cePageManager', [
        '$window',
        function($window) {
            var self={
                restrict:'E',
                scope:true,
                transclude: true,
                template:['<div class="row ce-panel">',
                                '<div class="col-sm-3 hidden-xs ce-panel-left-container"  ng-transclude>',
                                '</div>',
                                //'<div class="ce-panel-line col-sm-3 hidden-xs"></div>',
                                '<div class="col-sm-9 col-xs-12 ce-panel-right-container">',
                                    '<div class="ce-panel-right" ui-view=""></div>',
                                '<div>',
                            '</div>',
                        ].join('')
            };
        return self;
    }])
    .directive('cePageMenu', [
        function() {
            var self={
                restrict:'E',
                transclude: true,
                replace: true,
                template:'<div class="ce-panel-left" ng-transclude></div>',
            };
            return self;
        }])

    .directive('ceGroupLine', [
        function() {
            var self={
                restrict:'E',
                replace: true,
                template:'<div class="line" ></div>'
            };
            return self;
        }])
    .directive('ceGroupName', [
        function() {
            var self={
                restrict:'E',
                replace: true,
                transclude: true,
                scope:{
                    title:'@'
                },
                template:[
                    '<div class="ce-panel-group">',
                        '<div class="group-name" ng-bind="title"></div>',
                        '<div class="group-line" ></div>',
                        '<div class="group-list" ng-transclude></div>',
                    '</div>'
                ].join('')
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

                        cePageManagerService.addSubNavi({title:attr.ceTitle,uiSref:attr.uiSref});
                        return '<button  class="btn btn-default ce-panel-left-btn"   ><span class="glyphicon {{ceIcon}}" aria-hidden="true"></span><span>{{ceTitle}}</span></button>';
                    }else if(attr.ceStyle === 'menu'){
                        var naviObject = {
                            title:attr.ceTitle,
                            uiSref:attr.uiSref
                        };
                        // 添加组标题
                        if(!angular.isUndefined(elem[0].parentNode)){
                            naviObject.parentTitle = elem[0].parentNode.title;
                        }
                        cePageManagerService.addSubNavi(naviObject);
                        return '<a  class="ce-panel-left-menu" ui-sref-active="active"  ui-sref-opts="{reload:true}" ng-click="ceClick()" ><span class="glyphicon {{ceIcon}}" aria-hidden="true" ></span><span>{{ceTitle}}</span></a>';
                    }else if(attr.ceStyle === 'bar'){
                        var bar_naviObject = {
                            title:attr.ceTitle,
                            uiSref:attr.uiSref
                        };
                        // 添加组标题
                        if(!angular.isUndefined(elem[0].parentNode)){
                            bar_naviObject.parentTitle = elem[0].parentNode.title;
                        }
                        cePageManagerService.addSubNavi(bar_naviObject);
                        return '<a  class="ce-panel-left-bar" ui-sref-active="active"  ui-sref-opts="{reload:true}" ng-click="ceClick()" title="{{ceTitle}}"><span class="glyphicon {{ceIcon}}" aria-hidden="true"></span></a>';
                    }else if(attr.ceStyle === 'search' ){
                        return ['<div class="input-group ce-panel-search">',
                                    '<input type="text" class="form-control" ng-model="ceModel"  placeholder="'+attr.placeholder+'" />',
                                    '<span class="input-group-btn">',
                                        '<button class="btn btn-default" ng-click="ceClick({keyWord:ceModel})" type="button"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>',
                                    '</span>',
                                '</div>',
                            ].join('');
                    }
                }
            };
            return self;
        }])
    .directive('cePageHeader', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            template: [
            '<div class="row ce-page-header">',
                '<div class="col-sm-8">',
                '</div>',
                '<div class="col-sm-4 col-xs-12"">',
                    '<div class="ce-page-header-bar" ng-transclude>',
                    '</div>',
                '</div>',
            '</div>',
            ].join('')
        };
    })
    .directive('ceSearchBar', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                cePlaceholder: '@',
                ceClick:'&'
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