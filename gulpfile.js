'use strict';

var format = require('util').format;
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var debug = require('gulp-debug');
var buble = require('gulp-buble');

var minimist = require('minimist');
var options = minimist(process.argv.slice(2));

var genSourcemap = options.m || options.sourcemap;

gulp.task('build', function() {
  return gulp.src('src/**/*.js')
    .pipe(debug())
    .pipe(gulpIf(genSourcemap, sourcemaps.init()))
    .pipe(buble())
    .on('error', function(err) { console.error(err.toString()); })
    .pipe(gulpIf(genSourcemap, sourcemaps.write('.')))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return del('./dist/**/*');
});

gulp.task('build-watch', function() {
  var watcher = gulp.watch('src/**/*.js', [ 'build' ]);
  watcher.on('change', function(e) {
    console.log(format('File "%s" was %s, running build...', e.path, e.type));
  });
});

gulp.task('default', [ 'build' ]);
