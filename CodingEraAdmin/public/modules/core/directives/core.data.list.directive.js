/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core')
    .directive('ceDataList', [
        function() {
            var self={
                restrict:'E',
                scope:{
                    ceData:'=',
                    pagePreviousClick: '&',
                    pageNextClick: '&'
                },
                priority:100,
                replace: true,
                transclude: true,
                controller:['$scope',function($scope){

                    $scope.toolbars = [];

                    this.addData = function(data){
                        if(!angular.isUndefined(data.title)){
                            $scope.title = data.title;
                        }
                        if(!angular.isUndefined(data.subtitle)){
                            $scope.subtitle = data.subtitle;
                        }
                    };

                    //设置Toolbar
                    this.addToolBar = function(data){
                        var toobar = {
                            icon:data.icon,
                            eventHandler:data.eventHandler,
                            title:data.title,
                            statusEquals:data.statusEquals
                        };
                        $scope.toolbars.push(toobar);
                    };

                    //设置状态key
                    this.setStatus = function (data){
                        if(!angular.isUndefined(data.statusKey)){
                            $scope.statusKey = data.statusKey;
                        }
                    };


                }],
                template:['<div class="ce-data-list" >',
                                '<div ng-transclude></div>',
                                '<div class="ce-data-data-empty" ng-if="ceData.totalElements == 0">目前没有数据 >_< </div>',
                                '<div class="ce-data-preview" ng-repeat="item in ceData.content">',
                                    '<div class="title" ng-bind="item[title]" ng-click="testClick({obj:item})"></div>',
                                    '<div class="subtitle">发表于 {{item[subtitle]  | date:\'yyyy-MM-dd\'}}</div>',
                                    '<div class="ce-data-toolbar" >',
                                        '<a ng-if="toolbar.statusEquals.indexOf(item[statusKey])>0" class="toolbar-btn" ng-class="{del:toolbar.icon==\'glyphicon-trash\'}" ng-repeat="toolbar in toolbars" ng-click="toolbar.eventHandler({obj:item})" title="{{toolbar.title}}" >',
                                            '<span class="glyphicon {{toolbar.icon}}" aria-hidden="true"></span>',
                                        '</a>',
                                    '</div>',
                                '</div>',
                                '<nav ng-if="!ceData.first||!ceData.last">',
                                    '<ul class="pager" >',
                                        '<li class="previous" ng-if="!ceData.first"><a ng-click="pagePreviousClick()"><span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span> 上一页</a></li>',
                                        '<li class="next" ng-if="!ceData.last" ><a ng-click="pageNextClick()">下一页 <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a></li>',
                                    '</ul>',
                                '</nav>',
                            '</div>',
                        ].join('')
            };
        return self;
    }])
    .directive('ceData', [
        function() {
            var self={
                restrict:'E',
                replace: true,
                require: '^ceDataList',
                scope:{
                    title:'@',
                    subtitle:'@'
                },
                link: function(scope, ele,attr,ceDataList) {
                    ceDataList.addData(scope);

                }
            };
            return self;
        }])
    .directive('ceDataToolbar', [
        function() {
            var self={
                restrict:'E',
                replace: true,
                require: '^ceDataList',
                scope:{
                    statusKey:'@'
                },
                link: function(scope, ele,attr,ceDataList) {
                    ceDataList.setStatus(scope);

                }
            };
            return self;
        }])
    .directive('ceDataToolbarBtn', [
        function() {
            var self={
                restrict:'EA',
                require: '^ceDataList',
                scope: {
                    eventHandler: '&ngClick',
                    title:'@',
                    icon:'@',
                    statusEquals:'@'
                },
                link:function($scope,tElm,tAttrs,ceDataList) {
                    ceDataList.addToolBar($scope);
                }
            };
            return self;
        }]);