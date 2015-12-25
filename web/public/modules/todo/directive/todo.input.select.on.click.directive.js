/**
 * Created by Jason.
 *
 * 精要指令
 * 点击输入框选中所有文本
 */
"use strict";
angular.module('todo').directive("ceSelectOnClick", ['$window',
    function ($window) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {

                var selectText = function () {
                    //获取已经选中的text:$window.getSelection()
                    //文本已经处于选中状态不执行
                    if (!$window.getSelection().toString()) {
                        //输入框的值:this.value 或者 element.val()
                        // Required for mobile Safari
                        this.setSelectionRange(0, this.value.length);
                    }
                };

                element.bind('click', selectText);

                element.on('$destroy', function () {
                    element.unbind('click', selectText);
                });

            }
        };
    }]);