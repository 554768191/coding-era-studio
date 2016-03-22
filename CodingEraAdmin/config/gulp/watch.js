/**
 * Created by admin on 15/12/5.
 */
var _ = require('lodash');
var gulp = require('gulp');
var allAssets = _.extend(
    require('../env/all'),
    require('../env/development')
);
var path = require('path');
var $ = require('gulp-load-plugins')();
//var browserSync = require('browser-sync').create();

// Watch Files For Changes
gulp.task('watch', function () {
    // Start livereload
    $.livereload.listen();

    // Add watch rules
    gulp.watch(allAssets.assets.server.views).on('change', $.livereload.changed);
    gulp.watch(allAssets.assets.server.allJs, ['jshint']).on('change', $.livereload.changed);
    //gulp.watch(allAssets.assets.server.allJS).on('change', $.livereload.changed);

    gulp.watch(allAssets.assets.sass, ['sass']).on('change', $.livereload.changed);
    gulp.watch(allAssets.assets.css, ['csslint']).on('change', $.livereload.changed);

    if (process.env.NODE_ENV === 'production') {
        // gulp.watch(defaultAssets.server.gulpConfig, ['templatecache', 'jshint']);
        //gulp.watch(defaultAssets.client.views, ['templatecache', 'jshint']).on('change', plugins.livereload.changed);
    } else {
        // gulp.watch(defaultAssets.server.gulpConfig, ['jshint']);
        // gulp.watch(defaultAssets.client.views).on('change', plugins.livereload.changed);
    }
});
