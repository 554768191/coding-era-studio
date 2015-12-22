/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('todo').run(['Menus',
    function (Menus) {
        // Menus.addMenus();
        var parentMenus = Menus.genParentMenus('JASON', 'check');
        var jason1 = Menus.genNodeMenus('TODO', 'tasks', 'todo');
        var jason2 = Menus.genNodeMenus('GitHub Search', 'search', 'search');
        var jason3 = Menus.genNodeMenus('计时器', 'apple', 'timer');
        parentMenus.setOrder(99);
        parentMenus.addNodeMenus(jason1);
        parentMenus.addNodeMenus(jason2);
        parentMenus.addNodeMenus(jason3);
        Menus.addMenus(parentMenus.getMenus());
    }
]);