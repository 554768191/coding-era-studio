/**
 * Created by Jason on 15/12/28.
 */

"use strict";

angular.module('todo')
    .directive("ceFileUpload", [function () {
        return {
            scope: {
                options: "=ceFileUpload"
            },
            link: function (scope, element) {
                //var el = $(element);
                scope.$watch("options", function (options) {
                    console.log('Jason test ceFileUpload options', options);
                //    if (options) {
                //        var initialed = el.data("blueimp-fileupload");
                //        initialed ? el.fileupload("option", options) : el.fileupload(options);
                //    }
                });
            }
        };
    }]);