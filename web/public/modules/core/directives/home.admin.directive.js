/**
 * Created by Yan on 15/12/3.
 */
//var geekDirectives = angular.module('ceDirectives', []);


angular.module('core').directive('ceMenu', [
    function() {
        var menu={
            restrict:'EA',
            templateUrl:'modules/core/views/templates/menu.admin.template.html',
            replace:true,
            link: function(scope, ele, attrs) {
                $(ele).css('height',($(window).height()+$(window).scrollTop())-45);
                //ele.css('height',($(window).height()+$(window).scrollTop())-45);

            }
        };
        return menu;
    }]);