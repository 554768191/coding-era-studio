/**
 * Created by Jason.
 *
 * 精要指令
 * 统一管理返回按钮功能
 */
"use strict";
angular.module('core').directive("ceOnCancelClick", [
    '$window',
    function ($window) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var onCancelClick = function () {
                    //关闭modal
                    if(angular.isFunction(scope.$dismiss)){
                        scope.$dismiss('cancel');
                        return;
                    }
                    //返回上一页
                    history.back(-1);
                };

                element.bind('click', onCancelClick);

                element.on('$destroy', function () {
                    element.unbind('click', onCancelClick);
                });

            }
        };
    }]);