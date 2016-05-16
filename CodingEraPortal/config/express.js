/**
 * Created by Yan on 16/3/8.
 */
'use strict';

var express = require('express');
var consolidate = require('consolidate');
var homeRoute = require('../public/routes/home/home.routes');
var aboutRoute = require('../public/routes/about/about.routes');
var dynamicRoute = require('../public/routes/dynamic/dynamic.routes');
var contactRoute = require('../public/routes/contact/contact.routes');
//var caseRoute = require('../public/routes/case/case.routes');
var compression = require('compression');
var config = require('./config');
var path = require('path');

module.exports = function() {

    var app = express();


    //公用配置
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;
    app.locals.jsFiles = config.getJavaScriptAssets();
    app.locals.cssFiles = config.getCSSAssets();






    //配置模板引擎
    app.engine('.view.html', consolidate['swig']);
    app.set('view engine', '.view.html');
    app.set('views', './public/modules');


    //静态文件
    app.use('/static',express.static('./public/static'));
    app.use(express.static(path.resolve('./public')));

    //首页路由
    app.use('/', homeRoute);
    //关于我
    app.use('/about',aboutRoute);
    //动态
    app.use('/dynamic',dynamicRoute);
    //联系我们
    app.use('/contact',contactRoute);

    //作品(案例)
    require('../public/routes/case/case.routes')(app);
    //作品(案例)
    //app.use('/case',caseRoute(app));
    return app;
};