'use strict';

var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');

var $ = require('gulp-load-plugins')();

var assets = [
    'public/modules/**/*.html',
    'public/modules/*/img/*',
    'public/modules/*/i18n/*'
];

gulp.task('html', function () {
    del(['public/dist/html/*']);// 清空旧文件
    return gulp.src(assets)
        .pipe(gulp.dest('public/dist/html'));
});
