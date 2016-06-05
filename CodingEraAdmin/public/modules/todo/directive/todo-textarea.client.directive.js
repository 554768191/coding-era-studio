/**
 * Created by Jason on 16/1/4.
 *
 * textarea高度自增
 *
 * scrollHeight得到文本的实际高度, 实现比较恶心, 并且可能存在浏览器兼容问题.
 * 事实上, 如果firefox浏览器中设置了box-sizing为border-box, 计算出的高度就会不正常,
 * 需要判断浏览器的CSS后在borderWidth加上元素的padding值. 在一些浏览器中可能会出现元素向上跳动.
 *
 */
"use strict";
angular.module('todo').directive("ceTextarea", [
    function () {
        return {
            //require:'ngModel',
            link: function (scope, element, attrs, ngModelController) {

                //todo 暂时使用这种方法吧,改成div仿textarea会好点
                //var min = angular.isDefined(attrs.autoHeight) ? attrs.autoHeight : element[0].scrollHeight;
                //element.height(Number(min));
                //
                ////var borderWidth = element.outerHeight - element.innerHeight;
                //var inputFn = function () {
                //    //element.height(borderWidth + Math.max(element[0].scrollHeight, min));
                //    element.height(Math.max(element[0].scrollHeight, min));
                //};
                //element.bind("input", inputFn);
                //element.on('$destroy', function () {
                //    element.unbind("input", inputFn);
                //});


            }
        };
    }
]);