const { src, dest, parallel, series } = require('gulp');

const svgSprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');
const del = require('del');

function beginClean() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
}

function endClean() {
  return del(['./app/temp/sprite']);
}

function createSprite() {
  const config = {
    mode: {
      css: {
        sprite: ' sprite.svg',
        render: {
          css: {
            template: './app/templates/sprite.css'
          }
        }
      }
    }
  };
  return src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(dest('./app/temp/sprite/'));
}

function copySpriteCSS() {
  return src('./app/temp/sprite/css/**/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(dest('./app/assets/styles/modules'));
}

function copySpriteGraphic() {
  return src('./app/temp/sprite/css/**/*.svg').pipe(
    dest('./app/assets/images/sprites')
  );
}

module.exports = {
  beginClean,
  createSprite,
  copySpriteCSS,
  copySpriteGraphic,
  endClean
};
