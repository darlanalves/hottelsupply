var gulp = require('gulp');
var gulpSass = require('gulp-sass');

gulp.task('sass', function() {
	gulp.src('sass/*.scss')
		.pipe(gulpSass())
		.pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
	gulp.watch('sass/*.scss', ['sass']);
});