/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core').directive('ceContentHead', ['$window',
    function($window) {
        var contentHead={
            restrict:'EA',
            templateUrl:'modules/core/views/templates/content.head.admin.template.html',
            controller:function($scope,ContentHead) {
                $scope.title = ContentHead.getTitle();
                $scope.subTitle = ContentHead.getSubTitle();
            }
        };


        return contentHead;
    }]);