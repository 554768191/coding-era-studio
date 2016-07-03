/**
 * Created by admin on 15/12/5.
 */
"use strict";

var _ = require('lodash');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var path = require('path');
var $ = require('gulp-load-plugins')();
//var browserSync = require('browser-sync');
var allAssets = require('./../allAssets');
var plumber = require('gulp-plumber');

//编译sass
gulp.task('sass', function () {
    del([_.replace(allAssets.assets.css, '.css', '')]);// 清空旧文件
    return gulp.src(allAssets.assets.sass)
        .pipe(plumber())
        .pipe($.sass())
        .pipe($.rename(function (file) {
            file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
        }))
        .pipe(gulp.dest('./public/modules/'));
        //.pipe(browserSync.stream());
});

//CSS校验
gulp.task('csslint', function (done) {
    return gulp.src(allAssets.assets.css)
        .pipe(plumber())
        .pipe($.csslint('.csslintrc'))
        .pipe($.csslint.reporter())
        .pipe($.csslint.reporter(function (file) {
            if (!file.csslint.errorCount) {
                done();
            }
        }));
});

//CSS压缩
gulp.task('css-min', function (done) {
    del(['public/dist/css/*']);// 清空旧文件
    return gulp.src(allAssets.assets.css)
        .pipe(plumber())
        .pipe($.concat('all.css'))
        .pipe($.cssmin())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('public/dist/css')); //压缩后的路径
});

//编译 校验
gulp.task('css', function (done) {
    runSequence('sass', ['csslint', 'css-min'], done);
});