'use strict';

var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');
var allAssets = _.extend(
    require('../env/all'),
    require('../env/development')
);

var $ = require('gulp-load-plugins')();

var assets = _.union(
    //allAssets.assets.server.views
);

gulp.task('html', function () {
    del(['public/dist/html/*']);// 清空旧文件
    return gulp.src(['public/modules/**/*.html',
        'public/modules/*/img/*',
        'public/modules/*/i18n/*'
    ])
        .pipe(gulp.dest('public/dist/html'));
});
