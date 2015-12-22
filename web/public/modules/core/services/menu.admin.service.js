/**
 * Created by Yan on 15/12/3.
 */
"use strict";
angular.module('core').factory('Menus', ['$state','$location',
    function($state,$location) {
        var items=[];
        var service={};

        service.getMenus=function(){
            return items;
        };

        service.addMenus=function(_items){
            items.splice(items.length,0,_items);
        };

        service.genParentMenus=function(newMenus){
            var isShow = null;

            var setShow = function(flag){
                if(isShow ===  null){
                    isShow = flag;
                }
                return isShow;
            };
            //以前写法,暂不清楚干什么的 注释在2015-11-07
            if(angular.isUndefined(newMenus.route)){
                newMenus.show=false;
            }else{
                var state = $state.get(newMenus.route);
                if($location.$$path === state.url){
                    newMenus.show=setShow(true);
                }else {
                    newMenus.show =setShow(false);
                }
            }



            var _addNodeMenus=function(genNodeMenus){
                if(angular.isUndefined(newMenus.items)){
                    newMenus.items=[];
                }
                var node_routeName = genNodeMenus.menu.route;
                var node_state = $state.get(node_routeName);
                if($location.$$path === node_state.url){
                    newMenus.show=setShow(true);
                }else {
                    newMenus.show = setShow(false);
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

        service.genNodeMenus=function(newMenus){
            return {
                menu:newMenus,
                genNodeMenus:service.genNodeMenus
            };
        };

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
    }]);