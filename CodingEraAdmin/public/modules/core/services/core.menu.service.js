/**
 * Created by Yan on 15/12/3.
 */
"use strict";
angular.module('core').factory('Menus', [
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
        service.genParentMenus=function(newMenus){

            //父
            newMenus.shouldRender = service.shouldRender;


            var _addNodeMenus=function(genNodeMenus){
                if(angular.isUndefined(newMenus.items)){
                    newMenus.items=[];
                }

                //子
                genNodeMenus.menu.shouldRender = service.shouldRender;
                genNodeMenus.menu.isPublic = (genNodeMenus.menu.isPublic === null || typeof genNodeMenus.menu.isPublic === 'undefined') ? genNodeMenus.menu.isPublic :  newMenus.isPublic;

                newMenus.items.splice(newMenus.items.length,0,genNodeMenus.menu);
            };
            var _getMenus=function(){
                return  newMenus;
            };

            var setOrder=function(order){
                newMenus.order=order;
            };

            return {
                genParentMenus:service.genParentMenus,
                addNodeMenus:_addNodeMenus,
                getMenus:_getMenus,
                setOrder:setOrder
            };
        };

        //生成子菜单
        service.genNodeMenus=function(newMenus){
            return {
                menu:newMenus,
                genNodeMenus:service.genNodeMenus
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

        service.expandMenuByRoute = function(route){
            for(var index = 0 ; index<items.length ; index++){
                var menu = items[index];
                if(typeof menu.route !== 'undefined'){
                    if(menu.route === route){
                        menu.show = true;
                    }
                }else if(typeof menu.items !== 'undefined'){
                    for(var i = 0 ; i< menu.items.length ; i++){
                        var node_menu = menu.items[i];
                        if(node_menu.route === route ){
                            menu.show = true;
                        }
                    }
                }
            }
        };

        return service;
    }]);