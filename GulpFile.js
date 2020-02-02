const { watch, src, dest, parallel, series } = require('gulp')

const mixins = require('postcss-mixins')
const postcss = require('gulp-postcss')
const cssImport = require('postcss-import')
const cssVars = require('postcss-simple-vars')
const nested = require('postcss-nested')

const browserSync = require('browser-sync').create()

function watchTask() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    })
    watch(['app/assets/styles/**/*.css', 'app/index.html'], series(styles, reload))
}

function reload(done) {
    browserSync.reload()
    done()
}

// function watchHtml() {
//     watch(['app/index.html'], function() {

//     })
// }

function styles() {
    const plugins = [cssImport, mixins, nested, cssVars]
    return src('app/assets/styles/styles.css')
    .pipe(postcss(plugins))
    .on('error', function(err) {
        console.log(err.toString())
        this.emit('end')
    })
    .pipe(dest('app/temp/styles'))
}

function cssInject() {
    return src('app/temp/styles/styles.css')
    .pipe(browserSync.stream())
}

exports.default = series(
    styles,
    cssInject,
    parallel(watchTask)
)