/**
 * Created by Yan on 15/12/17.
 */
'use strict';

//数字转换数组的过滤器(专门给ngRepeat使用的)
angular.module('core')
    .filter('markdown',[
        '$sce',
        function($sce){
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
                return marked;
            })(window.marked);

            return function(input){
                if(!input||typeof input!=='string') return '';
                return $sce.trustAsHtml(marked(input));
            };
}]);