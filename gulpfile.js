// list of dependencies ( things require to run the below funcitions)
const { src, dest, watch, series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
const flatten = require('gulp-flatten');
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');



// SCSS
function compileSCSS() {
    return src('src/scss/**/*.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(prefix('last 2 versions'))
        .pipe(minify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/css'))
}

// Concatenate js files into one
function concatScripts() {
    return src([
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js'
    ])
        .pipe(concat('vendors.js'))
        .pipe(dest('src/js'));
}

// JS
function jsMin(){
    return src('src/js/*.js', { sourcemaps: true })
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/js'))
}


// Images
function optimizeImage() {
    return src('src/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(flatten())
        .pipe(dest('dist/img'))
}


// webp images
function webpImage() {
    return src('dist/img/**/*.{jpg,png}')
        .pipe(imagewebp())
        .pipe(dest('dist/img'))
}


// Copy static resources
/*function copyResources() {
    return gulp.src(['src/favicons/!**!/!*', 'src/fonts/!**!/!*', 'src/icons/!**!/!*'],{base: 'src'})
        .pipe(gulp.dest('dist'));

}*/

// create watchlist
function watchTask(){
    watch('src/scss/*.scss', compileSCSS);
    watch('src/js/*.js', jsMin);
    // watch('src/img/**/*', optimizeImage);
    // watch('dist/img/**/*.{jpg,png}', webpImage);

}



// default gulp
exports.default = series(
    compileSCSS,
    // concatScripts,
    jsMin,
    // optimizeImage,
    // webpImage,
    watchTask
);