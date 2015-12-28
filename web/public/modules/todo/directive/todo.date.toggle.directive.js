/**
 * Created by Jason on 15/12/26.
 *
 * uibDatepicker显示状态切换控件
 *
 * 官方做法,想要用按钮控制uibDatepicker的显示状态,就必须使用属性:ng-click="open($event)" is-open="status.opened"
 * controller还要加上:
 * ```js
    $scope.status = {
        opened: false
    };
    $scope.open = function($event) {
        $scope.status.opened = true;
    };
 * ```
 * 这个指令的目的的简化上面的写法,具体是如何用的,自己研究,呵呵呵
 * 开玩笑的,请看后台的demo
 *
 */

"use strict";

angular.module('todo')
    .directive("ceDateToggle", ['$parse',
        function ($parse) {
            return {
                restrict: "A",
                require: "uibDatepickerPopup",
                link: function (scope, element, attrs, uibDatepickerPopupController) {

                    //var index = $parse(attrs.inOpen)(scope);
                    var index = scope.$eval(attrs.ceDateToggle);
                    scope.opened[index] = !!scope.opened[index];

                    var toggleDropdown = function (event) {
                        event.preventDefault();
                        //输入框不是禁用状态才执行
                        if (!element.hasClass('disabled') && !attrs.disabled) {
                            scope.$apply(function () {
                                scope.opened[index] = !scope.opened[index];
                                console.log('Jason test scope.isOpen', scope.opened);
                            });
                        }
                    };

                    element.bind('click', toggleDropdown);

                    scope.$on('$destroy', function () {
                        element.unbind('click', toggleDropdown);
                    });


                }
            };
        }]);
