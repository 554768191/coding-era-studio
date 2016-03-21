/**
 * Created by Yan on 15/12/24.
 */

"use strict";

angular.module('core').directive("ceCode",[
    function() {
        return {
            restrict: "E",
            terminal: !0,
            replace:true,
            compile: function(event) {
                var htmlEsc = function(string){
                    var htmlEscapes = {
                        '&' : '&amp;',
                        '<' : '&lt;',
                        '>' : '&gt;',
                        '"' : '&quot;',
                        "'" : '&#x27;',
                        '/' : '&#x2F;'
                    };

                    var htmlEscaper = /[&<>"'\/]/g;
                    return ('' + string).replace(htmlEscaper, function(match) {
                        return htmlEscapes[match];
                    });
                };


                var html = htmlEsc(event.html()).trim();
                var content ='<pre class="ce-code">'+ window.prettyPrintOne(html, 'HTML', true) + '</pre>';
                // var content = window.prettyPrintOne(html,'html', 1) ;
                event.html(content);
            }
        };
    }
]);