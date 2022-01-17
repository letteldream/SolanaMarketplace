"use strict";

global.$ = {
    path: {
        task: require('./gulp/path/tasks.js')
    },
    gulp: require('gulp'),
    browserSync: require('browser-sync').create(),
    del: require('del')
};

$.path.task.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'copy:img',
        'copy:fonts',
        'copy:lib',
        'styles:dev',
        'js:dev'
    )
));

$.gulp.task('build', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'copy:img',
        'copy:fonts',
        'copy:lib',
        'styles:build',
        'js:build'
    )
));


$.gulp.task('build-min', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'copy:img',
        'copy:fonts',
        'copy:lib',
        'styles:build-min',
        'js:build-min'
    )
));

$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));
