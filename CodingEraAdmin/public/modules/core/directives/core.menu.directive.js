/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core')
    .factory('Menus', [
        function() {
            var items=[];
            var service={};

            // Define a set of default roles
            this.defaultRoles = ['*'];

            // A private function for rendering decision
            service.shouldRender = function(user) {
                //console.log('Jason test shouldRender', this);
                var roles = this.roles || "*";
                if (user) {
                    if (!!~(roles.indexOf('*'))) {
                        return true;
                    } else {
                        var roleList = roles.split(",");
                        for (var userRoleIndex in user.authorities) {
                            for (var roleIndex in roleList) {
                                if ("ROLE_"+roleList[roleIndex] === user.authorities[userRoleIndex].authority) {
                                    return true;
                                }
                            }
                        }
                    }
                } else {
                    return this.isPublic || false;
                }
                return false;
            };

            service.getMenus=function(){
                return items;
            };

            service.addMenus=function(_items){
                items.splice(items.length,0,_items);
            };

            //生成主菜单(父级菜单)
            service.genMenu=function(newMenus){

                //父
                newMenus.shouldRender = service.shouldRender;



                var _getMenus=function(){
                    return  newMenus;
                };

                var setOrder=function(order){
                    newMenus.order=order;
                };

                return {
                    genMenu:service.genMenu,
                    getMenus:_getMenus,
                    setOrder:setOrder
                };
            };



            //根据route获取当前菜单
            service.getMenusByRoute = function(route){
                for(var index = 0 ; index<items.length ; index++){
                    var menu = items[index];
                    if(typeof menu.route !== 'undefined'){
                        if(menu.route === route){
                            return menu;
                        }
                    }else if(typeof menu.items !== 'undefined'){
                        for(var i = 0 ; i< menu.items.length ; i++){
                            var node_menu = menu.items[i];
                            if(node_menu.route === route ){
                                return node_menu;
                            }
                        }
                    }
                }
                return null;
            };



            return service;
        }])
    .directive('ceMenu', ['$window', 'Authentication',
    function($window, Authentication) {
        var menu={
            restrict:'EA',
            template:[
                '<div class="ce-menu"  >',
                    '<a ',
                        ' ng-repeat="item in items | orderBy: \'order\' "',
                        ' data-ng-if="item.shouldRender(authentication.user);"',
                        ' ui-sref-active="active"',
                        ' ui-sref="{{item.route}}"',
                        ' ui-sref-opts="{reload:true}"',
                    ' >',
                        '<span class="glyphicon glyphicon-{{item.icon}}" aria-hidden="true" ></span>{{item.name}}',
                    '</a>',
                '</div>',
            ].join(''),
            replace:true,
            controller:['$scope', '$log', 'Menus', 'Authentication',function($scope, $log, Menus, Authentication) {
                $scope.authentication=Authentication;
                $scope.items=Menus.getMenus();
            }],
            link: function(scope, ele) {
                var headHeight = angular.element(document.querySelector('.ce-side-head')).height();
                scope.onResize = function() {
                    var contentHeight = angular.element(document.querySelector('.ce-content')).height();
                    var height = $window.innerHeight;
                    if(contentHeight > height){
                        ele.css({height:contentHeight+"px"});
                    }else{
                        ele.css({height:height - headHeight+"px"});
                    }
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


        return menu;
    }]);