"use strict";

var gulp = require('gulp');
var lr = require('tiny-lr');
var server = lr();
var $ = require('gulp-load-plugins')();
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');

var config = require('../config');
var allAssets = config.getAllAssets();

gulp.task('reload-file', function () {
    gulp.src(allAssets.assets.server.views)
        .pipe(plumber())
        .pipe(connect.reload());
    gulp.watch(allAssets.assets.server.allJs).on('change',function(e){

    });
});


gulp.task('watch', function () {
    $.livereload.listen();

    gulp.watch(allAssets.assets.server.views).on('change', $.livereload.changed);
    gulp.watch(allAssets.assets.server.allJs, ['jshint']).on('change', $.livereload.changed);
    gulp.watch(allAssets.assets.sass, ['sass'], ['csslint']).on('change', $.livereload.changed);
    gulp.watch(allAssets.assets.css, ['csslint']).on('change', $.livereload.changed);
});


