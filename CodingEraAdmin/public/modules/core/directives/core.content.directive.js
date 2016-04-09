/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core')
    .directive('ceContentHead', [
        '$window','$timeout','Menus','Authentication','cePageManagerService','ceUtil',
        function($window,$timeout,Menus,Authentication,cePageManagerService,ceUtil) {
            var service={
                restrict:'EA',
                template:[
                    '<div class="ce-content-head"  >',
                        '<div class="ce-side-head">',
                            '<div class="ce-logo " tooltip-placement="right"  uib-tooltip-template="\'logoText.html\'">',
                            '<div class="animated" ng-class="{tada:onAnimated,swing:!onAnimated}" ng-click="onAnimated=!onAnimated">',
                            '<img   src="/modules/core/img/logo_64X64_transparent.png">',
                            '</div>',
                            '</div>',
                        '</div>',
                        '<div class="ce-content-main">',
                            '<span class="ce-content-title"  >',
                                '<h1 ng-bind="title"></h1>',
                                '<h2 ng-bind="title2" ng-if="title2"></h2>',
                                '<h2 ng-bind="title3" ng-if="title3"></h2>',
                            '</span>',
                            '<span class="ce-content-subtitle"  ng-bind="subTitle" ></span>',

                            '<div class="ce-userInfo" uib-dropdown>',
                                '<div class="userInfo-container" uib-dropdown-toggle>',
                                    '<div class="userInfo-name">',
                                        '你好,{{authentication.user.displayName}}!',
                                    '</div>',
                                    '<div class="userInfo-avatar">',
                                    '   <img ng-src="{{authentication.user.avatar}}">',
                                    '</div>',
                                '</div>',
                                '<ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu aria-labelledby="simple-dropdown">',
                                    '<li ><a ui-sref="usersManage.edit({\'usersId\':null})"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> 个人设置</a></li>',
                                    '<li class="divider"></li>',
                                    '<li ><a ng-click="onExitClick()"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> 退出</a></li>',
                                '</ul>',
                            '</div>',
                        '</div>',
                    '</div>',
                ].join(''),
                scope: {},
                link: function(scope, el, attrs) {
                    scope.authentication = Authentication;
                    scope.onExitClick = function(){
                        ceUtil.confirmMessage('确定退出?').success(function(){
                            window.location.href = "/auth/signout";
                        });
                    };
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
                            //ContentHead.autoRefreshTitle(stateName);
                            var currentMenu = Menus.getMenusByRoute(stateName);

                            if(currentMenu){
                                scope.title = currentMenu.name;
                                scope.subTitle = currentMenu.subTitle;
                            }

                            // 子导航
                            var subNavi = cePageManagerService.getSubNavi();
                            if( angular.isUndefined(subNavi.parentTitle) ){
                                scope.title2 = subNavi.title;
                                scope.title3 = null;
                            }else{
                                scope.title2 = subNavi.parentTitle;
                                scope.title3 = subNavi.title;
                            }
                        });
                    });
                }
            };
            return service;
        }])
    .directive('ceContentView', ['$window',
    function($window) {
        var self={
            restrict:'C',
            link: function(scope, ele) {

                scope.onResize = function() {
                    var headHeight = $('.ce-side-head').height();
                    var mHead =$('.m-navbar-padding');
                    var mHeadPaddingHeight = mHead[0].clientHeight;

                    var windowHeight = $window.innerHeight;
                    ele.css({height: windowHeight- headHeight - mHeadPaddingHeight +"px"});
                };
                scope.onResize();
                angular.element($window).bind('resize', function() {
                    scope.onResize();
                });
                angular.element($window).bind('scroll', function() {
                    scope.onResize();
                });
            }
        };


        return self;
    }]);