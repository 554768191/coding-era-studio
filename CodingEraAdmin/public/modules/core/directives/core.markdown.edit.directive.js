/**
 * Created by Yan on 15/12/24.
 */

"use strict";

angular.module('core')
    .filter('markdown',['$sce',function($sce){
        var marked=(function(marked){
            marked.setOptions({
             renderer: new marked.Renderer(),
             gfm: true,
             tables: true,
             breaks: false,
             pedantic: false,
             sanitize: true,
             smartLists: true,
             smartypants: false
             });
            //marked.setOptions({
            //    highlight:function(code){
            //        return hljsServ.highlightAuto(code).value;
            //    }
            //})
            return marked;
        })(window.marked);

        return function(input){
            if(!input||typeof input!=='string') return '';
            return $sce.trustAsHtml(marked(input));
        };
    }])
    .directive('ceMarkdown',
    function() {
        return {
            restrict: "E",
            replace:true,
            scope:{
                ngModel:'='
            },
            template:['<div class="ce-markdown-container">',
                      '<div class="markdown-toolbar">',
                      '暂时没开发工具栏',
                      '</div>',
                      '<textarea class="form-control" rows="10" ng-model="ngModel"></textarea>',
                      '未开发完整的实时预览(markdown)',
                      '<div ng-bind-html="ngModel | markdown"></div>',
                      '</div>',
                        ].join(''),
            link: function(scope, el, attrs,ctrl) {
                console.log(scope.case);
                console.log(ctrl);
            }
        };
    });