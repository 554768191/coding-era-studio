/**
 * Created by admin on 15/12/5.
 */
var _ = require('lodash');
var gulp = require('gulp');
var server = require('gulp-express');
var allAssets = _.extend(
    require('../env/all'),
    require('../env/development')
);
var path = require('path');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins({
    rename: {
        'gulp-angular-templatecache': 'templateCache'
    }
});
var browserSync = require('browser-sync').create();

//运行server.js服务(暂时没用)
gulp.task('server', function () {
    server.run(['server.js']);
});

//Nodemon task
gulp.task('nodemon', function () {
    var called = false;
    return $.nodemon({
            script: 'server.js',
            nodeArgs: ['--debug'],
            ext: 'js,html',
            watch: _.union(allAssets.assets.server.views, allAssets.assets.server.allJS, allAssets.assets.server.config)
        })
        .on('start', function onStart() {
            if(!called){cb();}
            called = true;
        })
        .on('restart', function() {
            setTimeout(function() {
                console.log('-------- restart --------');
                reload({stream: false});
            }, 1000);
        });
});

//自动刷新浏览器(暂时结合nodemon)
gulp.task('browser-sync', ['nodemon'], function(){
    browserSync.init({
        proxy: 'http://localhost:3000',
        port: 4000,
        browser: ['/Applications/Google\ Chrome\ Canary.app/'],
        notify: true
    });

    // scss编译后的css将注入到浏览器里实现更新,注意是注入
    gulp.watch("public/modules/**/scss/*.scss", ['sass']);
    // 整个刷新页面
    gulp.watch(["public/modules/**/*.html"]).on('change', browserSync.reload);
    //gulp.watch(_.union(allAssets.assets.server.views, allAssets.assets.server.allJS)).on('change', browserSync.reload);

});
