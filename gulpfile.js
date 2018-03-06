var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
	browserSync.init(['./app/*.html', './app/static/css/style.css'], {
		https: true,
		server: {
			baseDir: './app/'
		}
	});
});

gulp.task('default', ['browser-sync'], function () {
	gulp.watch('./static/css/*.css'); // Watching all scss changes on changes in the background
	gulp.watch('./*.js').on('change', browserSync.reload);
});
