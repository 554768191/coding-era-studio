/**
 * Created by Yan on 15/12/3.
 */
"use strict";
angular.module('core').factory('Menus', [
    function() {
        var items=[];
        var service={};

        service.getMenus=function(){
            return items;
        };

        service.addMenus=function(_items){
            items.splice(items.length,0,_items);
        };

        //生成主菜单(父级菜单)
        service.genParentMenus=function(newMenus){

            var _addNodeMenus=function(genNodeMenus){
                if(angular.isUndefined(newMenus.items)){
                    newMenus.items=[];
                }
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