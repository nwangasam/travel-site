const { src, dest, parallel, series } = require('gulp')
const browserSync = require('browser-sync').create()

const postcss = require('gulp-postcss')
const mixins = require('postcss-mixins')
const cssImport = require('postcss-import')
const cssVars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const hexrgba = require('postcss-hexrgba')

function styles() {
    const plugins = [cssImport, mixins, nested, cssVars, hexrgba]
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

module.exports = {
    styles, cssInject
}