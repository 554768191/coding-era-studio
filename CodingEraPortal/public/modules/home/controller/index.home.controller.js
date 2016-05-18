/**
 * Created by Yan on 16/3/9.
 */
'use strict';

var homeController = (function(){
    var service = {};
    //初始化头部组
    service.initSectionHeader = function () {
        var naviHeight = 70;
        var windowHeight =  window.innerHeight - naviHeight;
        var sectionHeadObj = $('.section-header');
        var blueBackground = $('.gearbox');
        var paretnBackground = $('.gearbox').parent('div');
       // sectionHeadObj.height(windowHeight);
        console.log(window);
        blueBackground.height($('.ce-wrapper-body').height());
        paretnBackground.height($('.ce-wrapper-body').height());
        //$(window).resize(function(){
        //    //重新获取浏览器高度
        //    windowHeight = window.innerHeight - naviHeight;
        //    sectionHeadObj.height(windowHeight);
        //});

    };

    return service;
})();





//初始化头部组
homeController.initSectionHeader();