/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('demo').run(['Menus',
    function(Menus) {
        // Menus.addMenus();
        //var parentMenus=Menus.genParentMenus('DEMO页面','comment');
        var parentMenus=Menus.genParentMenus({name:'Super Example',icon:'comment'});

        var node_demo=Menus.genNodeMenus({name:'Base Example',subTitle:'这是一个副标题(不配置就不出现)',icon:'ice-lolly-tasted',route:'demo'});
        var node_demo2=Menus.genNodeMenus({name:'Util Example',icon:'cloud',route:'demo2'});

        parentMenus.setOrder(0);
        parentMenus.addNodeMenus(node_demo);
        parentMenus.addNodeMenus(node_demo2);
        Menus.addMenus(parentMenus.getMenus());
    }
]);