const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'src/'
    }
  });
}

function scripts() {
  return src(['src/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream());
}

function styles() {
  return src([
    'node_modules/normalize.css/normalize.css',
    'src/scss/style.scss'
  ])
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(
      autoprefixer({
        cascade: false,
        overrideBrowserslist: ['last 8 version'],
        grid: 'autoplace'
      })
    )
    .pipe(dest('src/css/styles'))
    .pipe(browserSync.stream());
}

function images() {
  return src('src/images/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(dest('dist/images'));
}

function clean() {
  return del('dist');
}

function build() {
  return src(
    ['src/css/**/*', 'src/fonts/**/*', 'src/js/main.min.js', 'src/*.html'],
    { base: 'src' }
  ).pipe(dest('dist'));
}

function watching() {
  watch(['src/scss/**/*.scss'], styles);
  watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts);
  watch('src/*.html').on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watching = watching;
exports.clean = clean;

exports.browsersync = browsersync;

exports.build = series(clean, images, build);
exports.default = parallel(styles, scripts, browsersync, watching);
