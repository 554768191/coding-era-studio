/**
 * Created by admin on 15/12/5.
 */
var _ = require('lodash');
var gulp = require('gulp');
var server = require('gulp-express');
var runSequence = require('run-sequence');
var del = require('del');
var allAssets = _.extend(
    require('../env/all'),
    require('../env/development')
);
var path = require('path');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

//编译sass & 自动注入到浏览器
gulp.task('sass', function () {
    del([_.replace(allAssets.assets.css, '.css', '')]);// 清空旧文件
    return gulp.src(allAssets.assets.sass)
        .pipe($.sass())
        // .pipe(plugins.autoprefixer())
        .pipe($.rename(function (file) {
            file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
        }))
        .pipe(gulp.dest('./public/modules/'))
        .pipe(browserSync.stream());
});

//CSS校验
gulp.task('csslint', function (done) {
    return gulp.src(allAssets.assets.css)
        .pipe($.csslint('.csslintrc'))
        .pipe($.csslint.reporter())
        .pipe($.csslint.reporter(function (file) {
            if (!file.csslint.errorCount) {
                done();
            }
        }));
});

//CSS build
gulp.task('css-min', function (done) {
    del(['public/dist/css/*']);// 清空旧文件
    return gulp.src(allAssets.assets.css)
        .pipe($.concat('all.css'))
        .pipe($.cssmin())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('public/dist/css')); //压缩后的路径
});

//编译 校验
gulp.task('css', function (done) {
    runSequence('sass', ['csslint', 'css-min'], done);
});