var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('browser-sync', function () {
	browserSync.init(["./app/static/style/*.css", "./app/static/js/*.js", "./app/static/js/modules/*.js"], {
		https: true,
		server: {
			baseDir: ['./app']
		}
	});
});

gulp.task('default', ['browser-sync'], function () {
	gulp.watch('./app/static/style/*.css'); // Watching all scss changes on changes in the background
	gulp.watch('./app/static/js/*.js').on('change', browserSync.reload);
	gulp.watch('./app/static/js/modules/*.js').on('change', browserSync.reload);
});
