const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const { reload } = browserSync;

// compile sass files to css

gulp.task('sass', () => gulp
  .src('./src/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(
    autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false,
    }),
  )
  .pipe(gulp.dest('./dist'))
  .pipe(
    browserSync.reload({
      stream: true,
    }),
  ));

// send html to dist folder

gulp.task('html', () => gulp.src('src/*.html').pipe(gulp.dest('./dist')));

// send scripts to dist folder

gulp.task('js', () => {
  gulp.src('./src/*.js').pipe(gulp.dest('./dist'));
});

// working directory

gulp.task('browser-sync', () => {
  browserSync.init({
    open: false,
    server: {
      baseDir: './dist',
    },
    ghostMode: false,
    notify: {
      styles: {
        position: 'fixed',
        top: 'auto',
        bottom: '0',
        margin: '10px',
        borderRadius: '5px',
        zIndex: '1',
      },
    },
  });
});

// watch files compiling

gulp.task('watch', () => {
  gulp.watch('./src/*.scss', ['sass']);
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./dist/*.html').on('change', reload);
  gulp.watch('./src/*.js', ['js']);
  gulp.watch('./dist/*.js').on('change', reload);
});

// default task

gulp.task('default', ['watch', 'browser-sync']);
