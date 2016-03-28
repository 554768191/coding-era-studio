/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core')
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
    .directive('cePageBtn', ['$timeout',
        function($timeout) {
            var self={
                restrict:'E',
                replace: true,
                transclude: true,
                scope:{
                    ceIcon:'@',
                    ceClick:'&ceClick'
                },
                template:function (elem, attr){
                    if(attr.ceStyle==='btn'){
                        return '<button  class="btn btn-default ce-panel-left-btn"   ><span class="glyphicon {{ceIcon}}" aria-hidden="true"></span><span ng-transclude></span></button>';
                    }else if(attr.ceStyle === 'menu'){
                        return '<a  class="ce-panel-left-menu" ui-sref-active="active"  ui-sref-opts="{reload:true}"><span class="glyphicon {{ceIcon}}" aria-hidden="true"></span><span ng-transclude></span></a>';
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
        }]);