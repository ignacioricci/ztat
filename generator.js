'use strict';

// Require dependencies
var build = require('./build.js');

// Render
build.renderJade();
console.log('Build succeeded for Jade templates...'.green);
build.renderSass();
console.log('Build succeeded for SASS templates...'.green);