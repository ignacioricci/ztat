'use strict';

// Require dependencies
var build = require('./build.js');
var chokidar = require('chokidar');
var colors = require('colors');

// Get config
var data = require('./config.json');

// Render for the first time before watching
build.renderJade();
build.renderSass()

// Watcher
function watcher(type, fn){
  var types = {
    'jade': __dirname + '/templates/',
    'sass': __dirname + data.sass_dir
  };
  chokidar
    .watch([types[type]], {persistent: true})
    .on('ready', function(path) { console.log('Watching ' + type.yellow + ' templates...'); })
    .on('change', function(path, stats) {
      fn();
      console.log('Build succeed for ' + type.green);
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