/**
 * Created by Yan on 15/12/3.
 */
'use strict';
angular.module('todo').run(['Menus',
    function (Menus) {
        // Menus.addMenus();
        var parentMenus = Menus.genParentMenus({name:'JASON的秘密基地', icon:'check'});
        var jason1 = Menus.genNodeMenus({name:'TODO', icon:'tasks', route:'todo'});
        var jason2 = Menus.genNodeMenus({name:'GitHub Search', icon:'search', route:'search'});
        var jason3 = Menus.genNodeMenus({name:'计时器', icon:'time', route:'timer'});
        var jason4 = Menus.genNodeMenus({name:'精要指令', icon:'king', route:'directiveKing'});
        parentMenus.setOrder(99);
        parentMenus.addNodeMenus(jason1);
        parentMenus.addNodeMenus(jason2);
        parentMenus.addNodeMenus(jason3);
        parentMenus.addNodeMenus(jason4);
        Menus.addMenus(parentMenus.getMenus());
    }
]);