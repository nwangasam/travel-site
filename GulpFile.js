// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp')
/* const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const concat = require('gulp-concat') */

// File path variable
const files = {
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/**/*.js'
}

// Sass task
function scssTask() {
    const plugins = [autoprefixer, cssnano, concat]
    return src(files.scssPath)
    .pipe(postcss(plugins))
    .pipe(dest('dist'))
}

// JS task

// Cachebusting task
function chache() {
    return src(['index.html'])
    .pipe(replace(/cb=\d+/g, 'cb=' + Math.random()*4))
    .pipe(dest('.'))
}

// Watch task

// Default task