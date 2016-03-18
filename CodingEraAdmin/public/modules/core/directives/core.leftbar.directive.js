/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core').directive('ceLeftbar', ['$window','$rootScope',
    function($window,$rootScope) {
        var leftbar={
            restrict:'C',
            link: function(scope, ele) {
                var contentView = angular.element(document.querySelector('.ce-content-view'));
                $rootScope.contentView = contentView[0];
                $rootScope.$watch('contentView.scrollHeight',function(abc,efg){
                    ele.css({height:abc + 'px'});
                });
                
            }
        };


        return leftbar;
    }]);