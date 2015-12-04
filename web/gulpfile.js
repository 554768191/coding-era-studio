var _ = require('lodash');
var gulp = require('gulp');
var server = require('gulp-express');
var runSequence = require('run-sequence');
var allAssets = require('./config/env/all');
var path = require('path');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins({
    rename: {
        'gulp-angular-templatecache': 'templateCache'
    }
});

//开发模式
gulp.task('env:dev', function () {
  process.env.NODE_ENV = 'development';
});

//生产模式
gulp.task('env:prod', function () {
  process.env.NODE_ENV = 'production';
});

//编译sass
gulp.task('sass', function () {
    return gulp.src(allAssets.assets.sass)
        .pipe(plugins.sass())
       // .pipe(plugins.autoprefixer())
        .pipe(plugins.rename(function (file) {
            file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
        }))
        .pipe(gulp.dest('./public/modules/'));
});

//CSS校验
gulp.task('csslint', function (done) {
    return gulp.src(allAssets.assets.css)
        .pipe(plugins.csslint('.csslintrc'))
        .pipe(plugins.csslint.reporter())
        .pipe(plugins.csslint.reporter(function (file) {
            if (!file.csslint.errorCount) {
                done();
            }
        }));
});

// Watch Files For Changes
gulp.task('watch', function () {
    // Start livereload
    plugins.livereload.listen();

    // Add watch rules
    gulp.watch(allAssets.assets.server.views).on('change', plugins.livereload.changed);
    //gulp.watch(allAssets.server.allJS, ['jshint']).on('change', plugins.livereload.changed);
    //gulp.watch(allAssets.assets.server.allJS).on('change', plugins.livereload.changed);
   // gulp.watch(allAssets.assets.css, ['csslint']).on('change', plugins.livereload.changed);
   // gulp.watch(allAssets.assets.sass, ['sass', 'csslint']).on('change', plugins.livereload.changed);

    if (process.env.NODE_ENV === 'production') {
       // gulp.watch(defaultAssets.server.gulpConfig, ['templatecache', 'jshint']);
        //gulp.watch(defaultAssets.client.views, ['templatecache', 'jshint']).on('change', plugins.livereload.changed);
    } else {
       // gulp.watch(defaultAssets.server.gulpConfig, ['jshint']);
       // gulp.watch(defaultAssets.client.views).on('change', plugins.livereload.changed);
    }
});

//js校验
gulp.task('jshint', function () {
    var assets = _.union(
        allAssets.assets.js
    );

    return gulp.src(assets)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.jshint.reporter('fail'));
});

//运行server.js服务(暂时没用)
gulp.task('server', function () {
    server.run(['server.js']);
});

// Nodemon task
gulp.task('nodemon', function () {
    return plugins.nodemon({
        script: 'server.js',
        nodeArgs: ['--debug'],
        ext: 'js,html',
        watch: _.union(allAssets.assets.server.views, allAssets.assets.server.allJS, allAssets.assets.server.config)
    });
});

//齐齐校验
gulp.task('lint', function (done) {
    //runSequence( 'sass', ['csslint', 'jshint'], done);
    runSequence( 'sass', ['csslint'], done);
});


gulp.task('default', function (done) {
    //参数1:开发模式
    //参数2:校验
    //参数3:开启服务
    runSequence('env:dev', 'lint',['nodemon','watch'], done);
});
