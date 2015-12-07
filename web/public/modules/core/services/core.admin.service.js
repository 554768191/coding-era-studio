/**
 * Created by Yan on 15/12/3.
 */
"use strict";
angular.module('core').factory('Menus', ['$state',
    function($state) {
        var items=[];
        var service={};

        service.getMenus=function(){
            return items;
        };

        service.addMenus=function(_items){
            console.log(_items);
            items.splice(items.length,0,_items);
        };

        service.genParentMenus=function(name,icon,route){
            var newMenus={};
            var self = this;
            newMenus.name=name;
            newMenus.icon=icon;
            var isShow = null;

            var setShow = function(flag){
                if(isShow ==  null){
                    isShow = flag;
                }
                return isShow;
            }
            //以前写法,暂不清楚干什么的 注释在2015-11-07
            if(angular.isUndefined(route)){
                newMenus.show=false;
            }else{
                if($state.is(route)){
                    newMenus.show=setShow(true);
                }else {
                    newMenus.show =setShow(false);
                }
                newMenus.route=route;
            }



            var _addNodeMenus=function(genNodeMenus){
                if(angular.isUndefined(newMenus.items)){
                    newMenus.items=[];
                }
                var node_routeName=genNodeMenus.menu.route;
                if($state.get(node_routeName)!=null && $state.get(node_routeName).name==node_routeName){
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

        service.genNodeMenus=function(name,icon,route){
            var newMenus={};
            newMenus.name=name;
            newMenus.icon=icon;
            newMenus.route=route;
            return {
                menu:newMenus,
                genNodeMenus:service.genNodeMenus
            };
        };

        return service;
    }]);