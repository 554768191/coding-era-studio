/**
 * Created by Jason.
 *
 * 精要指令
 * 权限控制指令
 *
 * ce-secured="!hasPermission('article','read')"
 * ce-secured="hasPermission('article','read')"
 * ce-secured="hasPermission('article','write')"
 *
 * 参看:
 * [AngularJS中在前后端分离模式下实现权限控制](http://www.open-open.com/lib/view/open1408084201582.html)
 * [lodash document](https://lodash.com/docs#matches)
 *
 */
"use strict";
angular.module('core').directive("ceSecured", [
    '$window','Authentication',
    function ($window, Authentication) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var expression = attrs.ceSecured;
                function toggleVisibilityBasedOnPermission() {
                    var hasPermission = Authentication.validExpression(expression);
                    if(hasPermission){
                        //element.show();
                    }else{
                        //element.hide();
                        element.remove();
                    }
                }
                toggleVisibilityBasedOnPermission();
                scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);

            }
        };
    }]);