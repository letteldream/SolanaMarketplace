const plumber = require('gulp-plumber'),
    pug = require('gulp-pug'),
    frontMatter = require('gulp-front-matter'),
    cached = require('gulp-cached'),
    notify = require('gulp-notify');

module.exports = function () {
    $.gulp.task('pug', () => {
        return $.gulp.src('./src/pug/*.pug')
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(frontMatter({ property: 'data' }))
            .pipe(pug({
                pretty: true
            }))
            .pipe(plumber.stop())
            .pipe(cached('pug'))
            .pipe($.gulp.dest('./build/'))
            .on('end', $.browserSync.reload);
    });
};
