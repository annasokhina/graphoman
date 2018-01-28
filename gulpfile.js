var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concatCss     = require('gulp-concat'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify");

// Сервер и автообновление страницы Browsersync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
});

gulp.task('lib-js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/wow-js/wow.js',
		'app/libs/slick/slick.min.js'
	])
	.pipe(concat('libs.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('lib-css', function() {
	return gulp.src([
		'app/libs/normalize-css/normalize.css',
		'app/libs/animate-css/animate.css',
		'app/libs/slick/slick.css',
		'app/libs/slick/slick-theme.css'
	])
	.pipe(concatCss("libs.css"))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

// Минификация пользовательских скриптов проекта и JS библиотек в один файл
gulp.task('js', function() {
	return gulp.src('app/scripts/*.js')
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('app/img')); 
});

gulp.task('watch', ['lib-js', 'lib-css', 'sass', 'js', 'browser-sync'], 
	function() {
		gulp.watch('app/sass/**/*.sass', ['sass']);
		gulp.watch('app/scripts/*.js', ['js']);
		gulp.watch('app/*.html', browserSync.reload);
	});

gulp.task('default', ['watch']);
