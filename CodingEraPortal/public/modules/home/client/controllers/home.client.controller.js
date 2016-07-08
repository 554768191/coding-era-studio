/**
 * Created by Yan on 16/3/9.
 */
'use strict';

var homeController = (function(){
    var service = {};
    //初始化头部组
    service.initSectionHeader = function () {
        var background = $('.gearbox');
        var parentBackground = $('.gearbox').parent('div');
        //background.height($('.ce-wrapper-body').height());
        //parentBackground.height($('.ce-wrapper-body').height());
        console.log("听说会用浏览器开发者工具的都是程序员,欢迎联系我们 %c CodingEraStudio@foxmail.com","color:red");
        $(window).resize(function(){
            //重新获取浏览器高度
           // background.height($('.ce-wrapper-body').height());
           // parentBackground.height($('.ce-wrapper-body').height());
        });

    };

    return service;
})();





//初始化头部组
homeController.initSectionHeader();