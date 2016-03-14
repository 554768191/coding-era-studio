/**
 * Created by Jason on 15/12/26.
 */
"use strict";
angular.module('todo').directive("ceEnter", ["$parse",
    function ($parse) {
        return {
            compile: function ($element, attr) {
                var fn = $parse(attr.ceEnter);
                return function (scope, element, attr) {
                    element.on("keydown", function (event) {
                        if(event.keyCode === 13){
                            scope.$apply(function () {
                                //todo 这句暂时不知道是什么意思,官方统一写法
                                fn(scope, {$event: event});
                            });
                        }
                    });
                };
            }
        };
    }]);