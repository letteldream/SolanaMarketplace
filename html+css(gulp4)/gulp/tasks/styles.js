const plumber = require('gulp-plumber'),
      scss = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      csso = require('gulp-csso'),
      csscomb = require('gulp-csscomb'),
      sourcemaps = require('gulp-sourcemaps'),
      rename = require('gulp-rename'),
      notify = require('gulp-notify'),
      stylesPATH = {
          "input": "./src/sass/",
          "output": "./build/css/"
      };

module.exports = function () {
    $.gulp.task('styles:dev', () => {
        return $.gulp.src(stylesPATH.input + 'app.sass')
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(autoprefixer({
                 overrideBrowserslist:  ['last 1 versions']
            }))
            .pipe(sourcemaps.write())
            .pipe(rename('app.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
            .pipe($.browserSync.stream());
    });
    $.gulp.task('styles:build', () => {
        return $.gulp.src(stylesPATH.input + 'app.sass')
            .pipe(scss())
            .pipe(autoprefixer({
                 overrideBrowserslist:  ['last 1 versions']
            }))
            .pipe(autoprefixer())
            .pipe(csscomb())
            .pipe(rename('app.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
    });
    $.gulp.task('styles:build-min', () => {
        return $.gulp.src(stylesPATH.input + 'app.sass')
            .pipe(scss())
            .pipe(autoprefixer())
            .pipe(csscomb())
            .pipe(csso())
            .pipe(rename('app.min.css'))
            .pipe($.gulp.dest(stylesPATH.output))
    });
};
