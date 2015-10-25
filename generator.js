'use strict';

// Require dependencies
var build = require('./build.js');

// Render
build.renderJade();
console.log('Build succeed for Jade templates...'.green)
build.renderSass()
console.log('Build succeed for SASS templates...'.green)