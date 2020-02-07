const webpack = require('webpack');
function scripts(done) {
    webpack(require('../webpack.config'), function(err, stats) {
        if (err) console.log(err.toString())

        // Log to the console statistics of webpack     bundling
        console.log(stats.toString())
        done()
    })
}

exports.scripts = scripts

// "no brainer" - when you act with courage, your brain is not involved. Your heart speaks first and you listen.