'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');
var rimraf = require('rimraf');
var plumber = require('gulp-plumber');

var config = {
  paths: {
    js: './src/js/**/*.js',
    sass: './src/scss/**/*.scss',
    jade: './src/partials/**/*.jade'
  }
};

gulp.task('clean-js', function(cb) {
  rimraf('./public/js', cb);
});
gulp.task('clean-css', function(cb) {
  rimraf('./public/css', cb);
});
gulp.task('clean-partials', function(cb) {
  rimraf('./public/partials', cb);
});

gulp.task('js', ['clean-js'], function() {
  return gulp.src(config.paths.js)
    .pipe(plumber())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});


gulp.task('css', ['clean-css'], function() {
  return gulp.src(config.paths.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
     browsers: ['last 2 versions', 'ie >= 9']
   }))
    .pipe(gulp.dest('./public/css'));
});


gulp.task('jade', ['clean-partials'], function(){
  return gulp.src(config.paths.jade)
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./public/partials'));
})


gulp.task('watch', function() {
  gulp.watch(config.paths.sass, ['css']);
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.jade, ['jade']);
});

gulp.task('default', ['js', 'css', 'jade', 'watch']);
