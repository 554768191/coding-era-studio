/**
 * Created by Yan on 16/3/9.
 */
'use strict';

var homeController = (function(){
    var service = {};
    //初始化头部组
    service.initSectionHeader = function () {
        var windowHeight =  window.innerHeight - 70;
        var sectionHeadObj = $('.section-header');
        sectionHeadObj.height(windowHeight);
        window.onResize = function(){

            var windowHeight2 =  window.innerHeight - 70;
            sectionHeadObj.height(windowHeight2);
        };
    };

    return service;
})();


//初始化头部组
homeController.initSectionHeader();