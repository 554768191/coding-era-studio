/**
 * Created by Yan on 15/12/3.
 */
"use strict";

angular.module('core').directive('ceLeftbar', ['$window','$rootScope',
    function($window,$rootScope) {
        var leftbar={
            restrict:'C',
            link: function(scope, ele) {
                //监控leftbar高度变化
                $rootScope.$watch(function(){
                    var contentView = angular.element(document.querySelector('.ce-rightContent'));
                    return contentView.height();
                },function(newHeight){
                    //15 = leftbar.marginTop = -15
                    //20 = leftbar.paddingTop = 20;
                    var contentViewHeight = newHeight + 15 + 20;//右边内容高度
                    var headHeight = angular.element(document.querySelector('.ce-head')).height();
                    var windowHeight = $window.innerHeight;
                    var innerHeight =  windowHeight - headHeight;//主窗体高度 - 头部高度
                    if(contentViewHeight > innerHeight){
                        ele.css({height:contentViewHeight + 'px'});
                    }else{
                        ele.css({height:innerHeight + 'px'});
                    }
                });
            }
        };


        return leftbar;
    }]);