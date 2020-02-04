const { watch, src, dest, parallel, series } = require('gulp')

const mixins = require('postcss-mixins')
const postcss = require('gulp-postcss')
const cssImport = require('postcss-import')
const cssVars = require('postcss-simple-vars')
const nested = require('postcss-nested')

const browserSync = require('browser-sync').create()
const svgSprite = require('gulp-svg-sprite')
const rename = require('gulp-rename')

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


function createSprite() {
    const config = {
        mode: {
            css: {
                sprite: 'svg/sprite.svg',
                render: {
                    css: {
                        template: './app/templates/sprite.css'
                    }
                }
            }
        }
    }
    return src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(dest('./app/temp/sprite/'))
}

function copySprite() { 
    return src('./app/temp/sprite/css/**/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(dest('./app/assets/styles/modules'))
}

exports.icons = series(createSprite, copySprite)
exports.createSprite = createSprite;
exports.default = series(
    styles,
    cssInject,
    parallel(watchTask)
)