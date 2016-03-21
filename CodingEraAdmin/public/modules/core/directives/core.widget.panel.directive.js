/**
 * Created by Yan on 15/12/3.
 */
"use strict";


angular.module('core')
    .directive('cePanel', [
        function () {
            var directive = {
                restrict: 'EA',
                template: '<div class="panel panel-default" ng-transclude></div>',
                replace: true,
                transclude: true
            };
            return directive;
        }])
    .directive('cePanelTitle', [
        function () {
            return {
                restrict: 'EA',
                transclude: true,
                replace: true,
                template: ' <div class="panel-heading" ng-transclude></div>'
            };


        }
    ]).directive('cePanelContent', [
        function () {
            return {
                restrict: 'EA',
                transclude: true,
                replace: true,
                template: ' <div class="panel-body" ng-transclude></div>'
            };
        }
    ]).directive('cePanelFooter', [
        function () {
            return {
                restrict: 'EA',
                transclude: true,
                replace: true,
                template: ' <div class="panel-footer" ng-transclude></div>'
            };
        }
    ]);