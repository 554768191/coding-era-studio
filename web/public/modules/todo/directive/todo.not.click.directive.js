/**
 * Created by Jason on 15/12/26.
 */
"use strict";
angular.module('todo').directive("ceNotClick", ["$parse", "$document",
    function ($parse, $document) {
        return {
            compile: function ($element, attr) {
                var fn = $parse(attr.cgNotClick);
                return function (scope, element, attr) {
                    var do_invoke = !0;
                    scope.$watch(attr.notClickWhen, function (b) {
                        do_invoke = !!b;
                    });
                    var not_clazz = attr.notClickClass, onClick = function (event) {
                        var target = event.target;
                        //if ((!not_clazz && !target.is(element) || not_clazz && !target.is(not_clazz)) && do_invoke){
                        //    Common.safeApply.call(scope, function () {
                        //        fn(scope, {$event: event});
                        //    });
                        //}
                    };
                    $document.on("click", onClick);
                    scope.$on("$destroy", function () {
                        $document.off("click", onClick);
                    });
                };
            }
        };
    }]);