'use strict';

var _ = require('lodash');
var path = require('path');
var gulp = require('gulp');
var allAssets = require('../config/env/all');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var assets = _.union(
    allAssets.assets.js
);

gulp.task('scripts-reload', function() {
  return buildScripts()
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return buildScripts();
});

function buildScripts() {
  return gulp.src(assets)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.size());
}

//js校验
gulp.task('jshint', function () {
  return gulp.src(assets)
      .pipe($.jshint())
      .pipe($.jshint.reporter('default'))
      .pipe($.jshint.reporter('fail'));
});