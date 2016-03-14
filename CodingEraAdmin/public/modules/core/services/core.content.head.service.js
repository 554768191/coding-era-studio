/**
 * 内容标题指令
 */
"use strict";
angular.module('core').factory('ContentHead', ['$log','Menus',
    function($log,Menus) {
        var titles = [];
        var subTitles = [];

        var service={};
        service.autoRefreshTitle = function(stateName){
            var currentMenu = Menus.getMenusByRoute(stateName);
            if(currentMenu){
                titles[0] = currentMenu.name;
                subTitles[0] = currentMenu.subTitle;
            }
        };

        //设置当前内容标题
        service.setTitle = function(newTitle){
            titles[0] =newTitle;
        };

        service.getTitle = function(){
            return titles;
        };

        service.getSubTitle = function(){
            return subTitles;
        };


        return service;
    }]);