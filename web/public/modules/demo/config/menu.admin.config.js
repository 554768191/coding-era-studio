/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('demo').run(['Menus',
    function(Menus) {
        // Menus.addMenus();
        var parentMenus=Menus.genParentMenus('DEMO页面','comment');

        var node_demo=Menus.genNodeMenus('原生代码','ice-lolly-tasted','demo');
        var node_demo2=Menus.genNodeMenus('工具代码','cloud','demo2');

        parentMenus.setOrder(0);
        parentMenus.addNodeMenus(node_demo);
        parentMenus.addNodeMenus(node_demo2);
        Menus.addMenus(parentMenus.getMenus());
    }
]);