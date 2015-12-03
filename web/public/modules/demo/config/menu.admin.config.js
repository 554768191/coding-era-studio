/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('demo').run(['Menus',
    function(Menus) {
        // Menus.addMenus();
        var parentMenus=Menus.genParentMenus('DEMO页面','comment');

        var node_curd=Menus.genNodeMenus('增删改查','cd','curd');
        var node_demo=Menus.genNodeMenus('UI页面','ice-lolly-tasted','demo');

        parentMenus.setOrder(0);
        parentMenus.addNodeMenus(node_curd);
        parentMenus.addNodeMenus(node_demo);

        Menus.addMenus(parentMenus.getMenus());
    }
]);