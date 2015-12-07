/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core').directive('ceMenu', ['$window','$document',
    function($window,$document) {
        var menu={
            restrict:'EA',
            templateUrl:'modules/core/views/templates/menu.admin.template.html',
            replace:true,
            link: function(scope, ele) {
                //不应该写死高度
                //todo 继续研究怎么获取head的高度
                var headHeight = 45;
                var height = $window.innerHeight - headHeight;
                ele.css({height:height+"px"});
            }
        };
        return menu;
    }]);