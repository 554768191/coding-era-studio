/**
 * Created by Yan on 15/12/17.
 */
'use strict';

//数字转换数组的过滤器(专门给ngRepeat使用的)
angular.module('core').filter('numberToArray', [
    function() {
        return function(number) {
            return new Array(number);
        };
    }
]);