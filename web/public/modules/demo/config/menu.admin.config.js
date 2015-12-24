/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('demo').run(['Menus',
    function(Menus) {
        //DEMO
        var demoMenu=Menus.genParentMenus({name:'Super Example',icon:'comment'});
        var node_demo=Menus.genNodeMenus({name:'Base Example',subTitle:'这是一个副标题(不配置就不出现)',icon:'ice-lolly-tasted',route:'demo'});
        demoMenu.setOrder(0);
        demoMenu.addNodeMenus(node_demo);
        Menus.addMenus(demoMenu.getMenus());

        //控件库
        var widgetMenu= Menus.genParentMenus({name:'控件库',icon:'wrench'});
        var node_widget=Menus.genNodeMenus({name:'面板',subTitle:'面板的简易封装',icon:'th',route:'widget'});
        widgetMenu.addNodeMenus(node_widget);
        Menus.addMenus(widgetMenu.getMenus());




    }
]);