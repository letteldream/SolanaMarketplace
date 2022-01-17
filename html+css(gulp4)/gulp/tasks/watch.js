module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./src/img/**/*.{png,jpg,gif,svg}', $.gulp.series('copy:img'));
        $.gulp.watch('./src/fonts/*.{woff2, woff}', $.gulp.series('copy:fonts'));
        $.gulp.watch('./src/js/lib/*.js', $.gulp.series('copy:lib'));
        $.gulp.watch('./src/pug/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./src/sass/**/*.{sass,scss}', $.gulp.series('styles:dev'));
        $.gulp.watch('./src/js/**/*.js', $.gulp.series('js:dev'));
    });
};
