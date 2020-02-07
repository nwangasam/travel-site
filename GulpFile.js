const { parallel, series } = require('gulp')

const { styles, cssInject } = require('./gulp/styles')
const { watchTask } = require('./gulp/watch')
const {
  beginClean,
  createSprite,
  copySpriteCSS,
  copySpriteGraphic,
  endClean
} = require('./gulp/sprites');
const { scripts } = require('./gulp/scripts')

exports.icons = series(
  beginClean,
  createSprite,
  parallel(copySpriteCSS, copySpriteGraphic),
  endClean
);
exports.createSprite = createSprite;
exports.default = series(styles, cssInject, scripts, parallel(watchTask));
exports.scripts = scripts;