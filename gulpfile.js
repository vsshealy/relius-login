/**
 * gulpfile.js
 * 
 * Notes | Gulp task file to compile and watch Sass. Run "gulp" command in Terminal to execute. Supports Gulp 4.
**/

// PLUGINS
var
    gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require("gulp-uglifycss"),
    sourcemaps = require("gulp-sourcemaps")
    ;

// FILES
var paths = {
    scss: {
        dir: "sass/**/*.scss",
        src: "./sass/style.scss",
        dest: "."
    }
};

// TASK | SASS
function compileSass() {
    return gulp
        .src(paths.scss.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(sourcemaps.write({ includeContent: false }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer("last 3 version", "> 1%", "safari 5", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.scss.dest))

        .pipe(rename({ suffix: ".min" }))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.scss.dest))
}

// TASK | WATCHFILES
function watchFiles() {
    gulp.watch(paths.scss.dir, compileSass);
}

// EXECUTE TASKS
var build = gulp.series(gulp.parallel(compileSass, watchFiles));
var watch = gulp.parallel(watchFiles);

exports.compileSass = compileSass;
exports.build = build;
exports.watch = watch;
exports.default = build;