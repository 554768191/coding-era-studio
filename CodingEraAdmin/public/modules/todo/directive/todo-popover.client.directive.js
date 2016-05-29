/**
 * Created by Jason on 15/12/17.
 */
"use strict";
angular.module('todo').directive("cePopover", ['$compile','$uibPosition',
    function ($compile, $uibPosition) {
        return {
            restrict: "A",
            link: function (scope, element, attrs, controll) {
                //console.log('Jason test controll', controll);
                //
                //element.bind("click", function () {
                //    var position = $uibPosition.position(element);
                //    var offset = $uibPosition.offset(element);
                //    console.log('Jason test cePopover', position);
                //
                //    var pop = element.next();
                //    var $pop = $compile(pop);
                //    console.log('Jason $pop', $pop);
                //    var arrow = pop.find('div')[0];
                //    var $arrow = $compile(arrow)(scope);
                //    var pos = $uibPosition.positionElements(element, $arrow, 'left', true);
                //    console.log('Jason test pos', pos);
                //
                //    $arrow.css({
                //        //"display":"none",
                //        'left': pos.left + 'px'
                //    });
                //});
            }
        };
    }]);