/**
 * Created by Yan on 15/12/24.
 */

"use strict";

angular.module('core').directive("code",
    function() {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(e) {
                var t = e.hasClass("linenum"),
                    n = /lang-(\S+)/.exec(e[0].className),
                    r = n && n[1],
                    a = e.html();
                console.log(a);
                e.html(window.prettyPrintOne(a, r, t));
            }
        };
    });