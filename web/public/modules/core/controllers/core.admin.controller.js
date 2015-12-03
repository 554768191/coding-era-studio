/**
 * Created by Yan on 15/12/3.
 */
'use strict';


angular.module('core').controller('menuCtrl',[ '$scope', '$log','Menus', function($scope, $log,Menus) {
    //console.log(Menus);
    //Menus.addMenus();
    $scope.items=Menus.getMenus();

    $scope.onShowNode=function(item){
        item.show=!item.show;
    };

}]);