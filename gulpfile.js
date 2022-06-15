"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass")(require('sass'));
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imageMin = require("gulp-imagemin");
var del = require("del");


function style(){
  return gulp.src("source/scss/style.scss")
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream())
}

function copy(){

    return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**",
      "source/*.ico",
      "source/*.html"
    ], {
      base: "source"
    })
      .pipe(gulp.dest("build"));

}

function watch(){
  server.init({
    server:{
      baseDir: './build/'
    }
  })

  gulp.watch('source/scss/**/*.scss', style);
  gulp.watch('source/*.html').on('change', copy);
  gulp.watch('source/*.html').on('change', server.reload);
  gulp.watch('source/js/**/*.js').on('change', server.reload);
}

exports.style = style;
exports.watch = watch;
exports.copy = copy;
// gulp.task("css", function () {
//   return gulp.src("source/sass/style.sass")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(less())
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(csso())
//     .pipe(rename("style.min.css"))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("build/css"))
//     .pipe(server.stream());
// });
//
// gulp.task("images", function () {
//   return gulp.src("source/img/**/*.{png, jpg,svg}")
//     .pipe(imageMin([
//       imageMin.optipng({optimizationLevel: 3}),
//       imageMin.jpegtran({progressive: true}),
//       imageMin.svgo()
//     ]))
//     .pipe(gulp.dest("source/img"));
// });
//
//

//
// gulp.task("clean", function () {
//   return del("build");
// });
//
// gulp.task("server", function () {
//   server.init({
//     server: "build/",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });
//
//   gulp.watch("source/less/**/*.less", gulp.series("build"));
//   gulp.watch("source/*.html").on("change", server.reload);
// });
//
// gulp.task("build", gulp.series("clean", "copy","css"));
// gulp.task("start", gulp.series("build", "server"));
