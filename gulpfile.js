const path = require('path');
const del = require('del');
// GULP
const gulp = require('gulp');
// GULP plugins
// Browser syncronisation
const browserSync = require('browser-sync').create();
// File concatination
const fileinclude = require('gulp-file-include');
// CSS and SCSS
const scss = require('gulp-sass');
const webpCSS = require('gulp-webp-css');
const csso = require('gulp-csso');
// HTML
const webpHTML = require('gulp-webp-html');
// JavaScript
const babel = require('gulp-babel');
const minify = require('gulp-minify');
// Images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

// Paths constraction

const build = {
  html: path.resolve(__dirname, './build/html/'),
  css: path.resolve(__dirname, './build/css/'),
  index: path.resolve(__dirname, './build/'),
  js: path.resolve(__dirname, './build/js/'),
  images: path.resolve(__dirname, './build/img/'),
  fonts: path.resolve(__dirname, './build/fonts/'),
};

const src = {
  html: path.resolve(__dirname, './src/**/*.html'),
  sass: path.resolve(__dirname, './src/scss/*.scss'),
  index: path.resolve(__dirname, './src/'),
  js: path.resolve(__dirname, './src/js/**/*.js'),
  images: path.resolve(__dirname, './src/img/*.*'),
  fonts: path.resolve(__dirname, './src/fonts/'),
};

const paths = {
  src,
  build,
};

// Gulp pipelines

const html = () => gulp.src(paths.src.html)
  .pipe(fileinclude())
  .pipe(webpHTML())
  .pipe(gulp.dest(paths.build.index))
  .pipe(browserSync.stream());

const sass = () => gulp.src(paths.src.sass)
  .pipe(scss())
  .pipe(webpCSS())
  .pipe(csso())
  .pipe(gulp.dest(paths.build.css))
  .pipe(browserSync.stream());

const js = () => gulp.src(paths.src.js)
  .pipe(babel())
  .pipe(minify())
  .pipe(gulp.dest(paths.build.js))
  .pipe(browserSync.stream());

const images = () => gulp.src(paths.src.images)
  .pipe(imagemin({
    progressive: true,
    optimizationLevel: 5,
  }))
  .pipe(gulp.dest(paths.build.images))
  .pipe(gulp.src(paths.src.images))
  .pipe(webp())
  .pipe(gulp.dest(paths.build.images));

// Function to watch for changes in files

const watcher = () => {
  gulp.watch(`${paths.src.index}**/*.html`, html);
  gulp.watch(paths.src.sass, sass);
  gulp.watch(paths.src.js, js);
};

// Clears build folder

const clear = async () => {
  const deleted = await del(['./build/**']);
  console.warn('\x1b[33m%s\x1b[0m', `BUILD folder CLEARED: ${deleted.length} objects has been deleted!,`);
};

// Starts development server on localhost:3000

const server = () => {
  browserSync.init({
    server: paths.build.index,
    port: 3000,
  });
};

module.exports.server = server;
module.exports.html = html;
module.exports.sass = sass;
module.exports.js = js;
module.exports.clear = clear;
module.exports.images = images;

module.exports.default = gulp.series(clear, html, sass, js, images, gulp.parallel(server, watcher));
