/**
 * Created by Jason on 15/12/17.
 */
"use strict";
angular.module('todo').directive("ceTest", [
    function () {
        return {
            restrict: "A",
            template: "this is a test: {{testa}} {{typeInfo}}",
            scope: {
                testa: '=ceTest',
                typeInfo: '=type'
            },
            link: function (scope, element, attrs) {

                console.log('Jason test attrs', attrs);
                //attrs.ceTest "testa"
                //attrs.type "testb"
                //attrs.type2 "testc"

                scope.$watch(attrs.ceTest, function(value) {
                    console.log('Jason test attrs val', value);
                    //attrs.ceTest "test1"
                });
            }
        };
    }]);