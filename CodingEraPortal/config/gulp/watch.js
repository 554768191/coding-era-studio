var gulp = require('gulp');
var allAssets = require('./allAssets');
var $ = require('gulp-load-plugins')();

gulp.task('html', function () {
    gulp.src(allAssets.assets.server.views)
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    //$.livereload.listen();

    gulp.watch(allAssets.assets.server.views).on('change', $.livereload.changed);
    gulp.watch(allAssets.assets.server.allJs, ['jshint']).on('change', $.livereload.changed);
    gulp.watch(allAssets.assets.css, ['csslint']).on('change', $.livereload.changed);
    gulp.watch(allAssets.assets.sass, ['sass', 'csslint']).on('change', $.livereload.changed);

});