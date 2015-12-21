/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('todo').run(['Menus',
    function (Menus) {
        // Menus.addMenus();
        var parentMenus = Menus.genParentMenus('JASON', 'check');
        var node_demo = Menus.genNodeMenus('TODO', 'tasks', 'todo');
        parentMenus.setOrder(99);
        parentMenus.addNodeMenus(node_demo);
        Menus.addMenus(parentMenus.getMenus());
    }
]);