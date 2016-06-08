/**
 * Created by Jason.
 *
 * 精要指令
 * 权限控制指令
 *
 * ce-secured="!hasPermission('article','read')"
 * ce-secured="hasPermission('article','read')"
 * ce-secured="hasPermission('article','write')"
 */
"use strict";
angular.module('core').directive("ceSecured", [
    '$window','Authentication', '$parse',
    function ($window, Authentication, $parse) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var _ = $window._;
                var expression = attrs.ceSecured;

                if(!_.isString(expression))
                    throw "ceSecured value must be a string";

                expression = _.trim(expression);
                var notPermissionFlag = expression[0] === '!';
                if(notPermissionFlag) {
                    expression = expression.slice(1).trim();
                }

                function toggleVisibilityBasedOnPermission() {
                    var hasPermission = $parse(expression)(Authentication);
                    if(hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag){
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