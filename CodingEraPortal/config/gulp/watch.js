"use strict";

var gulp = require('gulp');
var allAssets = require('./../allAssets');
var lr = require('tiny-lr');
var server = lr();
var $ = require('gulp-load-plugins')();
var connect = require('gulp-connect');

gulp.task('reload-file', function () {
    gulp.src(allAssets.assets.server.views)
        .pipe(connect.reload());
    gulp.watch(allAssets.assets.server.allJs).on('change',function(e){

    });
});


gulp.task('watch', function () {
    //$.livereload.listen();

    $.livereload.listen();

    gulp.watch(allAssets.assets.server.views).on('change', $.livereload.changed);
    gulp.watch(allAssets.assets.server.allJs, ['jshint']).on('change', $.livereload.changed);
    gulp.watch(allAssets.assets.css, ['csslint']).on('change', $.livereload.changed);
    gulp.watch(allAssets.assets.sass, ['sass', 'csslint']).on('change', $.livereload.changed);

    //gulp.watch(['../../public/controllers/**/*.js'],['reload']);
    //gulp.src(allAssets.assets.server.allJs)
    //    .pipe(connect.reload());
});


