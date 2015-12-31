/**
 * Created by Jason on 2015-12-24.
 *
 * Dropdown指令简化版
 * 输入框下拉
 * 它的口头禅:刚拉的,还热乎乎的哦~
 *
 * 在自定义Angular指令时，其中有一个叫做require的字段，这个字段的作用是用于指令之间的相互交流。
 * 举个简单的例子，假如我们现在需要编写两个指令，在linking函数中有很多重合的方法，为了避免重复自己（著名的DRY原则），
 * 我们可以将这个重复的方法写在第三个指令的controller中，然后在另外两个需要的指令中require这个拥有controller字段的指令，
 * 最后通过linking函数的第四个参数就可以引用这些重合的方法。
 *
 * see [AngularJS指令进阶 -- ngModelController详解](http://sentsin.com/web/659.html)
 * see demo [指令的交互](http://www.cnblogs.com/xing901022/p/4290411.html)
 *
 */

"use strict";

angular.module('todo')
    //公用方法定义在这里,指令交互时可以调用
    .controller("inputDropdownCtrl",
        ['$scope', '$element', '$attrs', '$compile', '$parse', '$document', '$uibPosition', '$rootScope', '$timeout', 'uibDropdownService',
            function ($scope, element, $attrs, $compile, $parse, $document, $uibPosition, $rootScope, $timeout, uibDropdownService) {
                var that = this;

                //关于scope,官方使用了$new(),你们为什么要这么折磨自己,我不懂!但是相信总有一天我会回来和你们唱这首歌的.
                //var scope = $scope.$new();
                var scope = $scope;

                //isOpen状态转换,此方法被ceInputDropdownToggle指令调用
                this.toggle = function (open) {
                    scope.isOpen = (arguments.length ? !!open : !scope.isOpen);
                    return scope.isOpen;
                };

                //因为$attrs.isOpen可以是表达式,所以要使用$parse得到boolean值scope.isOpen.
                var getIsOpen = $parse($attrs.isOpen);
                scope.$watch(getIsOpen, function (value) {
                    scope.isOpen = !!value;
                });

                //夺命连环watch,监听scope.isOpen的结果是否有变化.
                scope.$watch("isOpen", function (value) {
                    //$uibPosition.position()可以取得指令元素的位置信息,如{width: 906, height: 34, top: 0, left: 36}
                    var dropdownTogglePosition = $uibPosition.position(that.dropdownToggle);
                    if (that.dropdownMenu && that.dropdownToggle) {
                        var css = {
                            //top: pos.top + 'px',
                            position: 'absolute',
                            zIndex:'999',
                            marginTop: dropdownTogglePosition.height + 'px',
                            display: value ? 'block' : 'none',
                            width: dropdownTogglePosition.width + 'px'
                        };
                        that.dropdownMenu.css(css);
                    }

                    //监听isOpen的变化,true时下拉.false时收起.
                    //写法一:todo 老实人写法,未写完
                    /*if (value) {
                     //scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                     //scope.position.top = scope.position.top + element.prop('offsetHeight');

                     //用timeout可以把代码放到当前digest循环外
                     $timeout(function () {
                     $document.bind('click', documentClickBind);
                     }, 0, false);
                     } else {
                     //$document.unbind('click', documentClickBind);
                     }*/

                    //写法二:精明地调用uib的service
                    if (value) {
                        uibDropdownService.open(scope);
                    } else {
                        uibDropdownService.close(scope);
                    }
                });

                //$document点击事件,负责隐藏下拉
                /*function documentClickBind(event) {
                 var popup = $popup[0];
                 var dpContainsTarget = element[0].contains(event.target);
                 //The popup node may not be an element node
                 //In some browsers (IE) only element nodes have the 'contains' function
                 var popupContainsTarget = popup.contains !== undefined && popup.contains(event.target);
                 //只有当鼠标点击的target不是输入框或者下拉的内容时,才隐藏下拉
                 if (scope.isOpen && !(dpContainsTarget || popupContainsTarget)) {
                 scope.$apply(function() {
                 scope.isOpen = false;
                 });
                 }
                 }*/

                //如下,别问我为什么要写这么多,这是uibDropdownService内部要用到的...

                //下拉何时收起
                scope.getAutoClose = function () {
                    return $attrs.autoClose || 'always'; //or 'outsideClick' or 'disabled'
                };
                //输入框
                scope.getToggleElement = function () {
                    return that.dropdownToggle;
                };
                //下拉包裹的元素对象
                scope.getDropdownElement = function () {
                    return that.dropdownMenu;
                };

                scope.isKeynavEnabled = function () {
                    return false;
                };

            }])
    //这个指令用于包住下面2个指令,目的是用于共享inputDropdownCtrl
    .directive("ceInputDropdown", [
        function () {
            return {
                restrict: "A",
                controller: 'inputDropdownCtrl',
                link: function (scope, element, attrs, inputDropdownCtrl) {

                }
            };
        }])
    //这个指令用在输入框上,点击的时候显示下拉
    .directive("ceInputDropdownToggle", [
        function () {
            return {
                restrict: "A",
                require: '^ceInputDropdown',// 获取ngModelController
                link: function (scope, element, attrs, inputDropdownCtrl) {
                    if (!inputDropdownCtrl) {
                        return;
                    }

                    if (!inputDropdownCtrl.dropdownToggle) {
                        inputDropdownCtrl.dropdownToggle = element;
                    }

                    var toggleDropdown = function (event) {
                        event.preventDefault();
                        //输入框不是禁用状态才执行
                        if (!element.hasClass('disabled') && !attrs.disabled) {
                            scope.$apply(function () {
                                //每次点击都显示下拉(不需要隐藏下拉)
                                inputDropdownCtrl.toggle(true);
                            });
                        }
                    };

                    element.bind('click', toggleDropdown);

                    scope.$on('$destroy', function () {
                        element.unbind('click', toggleDropdown);
                    });
                }
            };
        }])
    //这个指令的目的是方便找到下拉的内容
    .directive("ceInputDropdownView", [
        function () {
            return {
                restrict: "A",
                require: '^ceInputDropdown',// 获取ngModelController
                link: function (scope, element, attrs, inputDropdownCtrl) {
                    //console.log('Jason test inputDropdownCtrl', inputDropdownCtrl);
                    if (!inputDropdownCtrl) {
                        return;
                    }
                    if (!inputDropdownCtrl.dropdownMenu) {
                        inputDropdownCtrl.dropdownMenu = element;
                    }
                }
            };
        }]);