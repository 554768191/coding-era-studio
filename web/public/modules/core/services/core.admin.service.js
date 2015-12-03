/**
 * Created by Yan on 15/12/3.
 */

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

        service.genParentMenus=function(name,icon,route){
            var newMenus={};
            newMenus.name=name;
            newMenus.icon=icon;
            if(angular.isUndefined(route)){
                newMenus.show=false;
            }else{
                newMenus.route=route;
            }

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