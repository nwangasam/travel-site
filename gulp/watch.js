const { watch, series, parallel } = require('gulp')
const browserSync = require('browser-sync').create()
const { styles } = require('./styles')
const { scripts } = require('./scripts')

function watchTask() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
  watch(
    [
      'app/assets/styles/**/*.css',
      'app/index.html',
    ],
    series(styles, reload)
  );
  watch(
    [
      'app/assets/scripts/**/*.js'
    ],
    series(scripts, reload)
  );
}

function reload(done) {
  browserSync.reload();
  done();
}

exports.watchTask = watchTask;
