'use strict';

// Require dependencies
var build = require('./build.js');
var chokidar = require('chokidar');

// Get config
var data = require('./config.json');

// Render for the first time before watching
build.renderJade();
console.log('Build succeeded for Jade templates...'.green);
build.renderSass();
console.log('Build succeeded for SASS templates...'.green);

// Watcher
function watcher(type, fn){
  var types = {
    'jade': __dirname + '/templates/',
    'sass': __dirname + '/' + data.output_dir + '/' + data.sass_dir + '/'
  };
  chokidar
    .watch([types[type]], {persistent: true})
    .on('ready', function(path) { console.log('Watching ' + type.yellow + ' templates...'); })
    .on('change', function(path, stats) {
      if (fn != ''){
        fn();
      }
      console.log('Build succeeded for ' + type.green + ' (' + path.gray + ')');
      console.log('Watching ' + type.yellow + ' templates...');
    });
}

// Run watch
watcher('jade', build.renderJade);
watcher('sass', build.renderSass);

// Print errors
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});