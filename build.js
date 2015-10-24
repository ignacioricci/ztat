'use strict';

// Require dependencies
var fs = require('fs');
var child_process = require('child_process');
var jade = require('jade');
var mkdirp = require('mkdirp');
var sass = require('node-sass');

// Get config
var data = require('./config.json');

// Render Jade
exports.renderJade = function(){

  // Get templates
  data.templates.forEach(function(template){

    var tempLangs = template.languages;
    var tempName = template.name;
    var tempFilename = __dirname + '/templates/' + tempName + '/' + 'template.jade';
    var tempSource = fs.readFileSync(tempFilename);
    var fn = jade.compile(tempSource, {doctype: 'html', filename:tempFilename, pretty: data.pretty});

    // Get languages from template
    function getLang(lang, url){
      var locals = {};
      var i18n = require(__dirname + '/templates/' + tempName + '/' + lang + '.json');

      // Apply locals
      for(var i in i18n) {
        locals[i] = i18n[i];
      }

      // Build output paths
      if (data.default_language == lang){
        var outputPath = __dirname + '/' + data.output_dir + '/';
      }
      else {
        var outputPath = __dirname + '/' + data.output_dir + '/' + lang + '/';
      }
      if (tempName !== 'index'){
        outputPath += url + '/';
      }

      // Set variables
      locals.base_url = data.base_url;
      locals.assets_dir = locals.base_url + data.assets_dir + '/';
      locals.css_dir = locals.base_url + data.css_dir + '/';
      locals.sass_dir = locals.base_url + data.sass_dir + '/';
      locals.fonts_dir = locals.base_url + data.fonts_dir + '/';
      locals.javascript_dir = locals.base_url + data.javascript_dir + '/';
      locals.current_language = lang;

      // Generate automatic page links
      locals.page_link = function(name){
       
        var page = data.templates.filter(function(t){return t.name === name});
        page = page[0].languages[lang];
            
        if (name != 'index' && data.default_language != lang){
          return lang + '/' + page;
        }
        else if (name != 'index' && data.default_language == lang){
          return page;
        }
        else if (name == 'index' && data.default_language != lang){
          return '/' + data.output_dir + '/' + lang + '/';
        }
        else {
          return '/' + data.output_dir + '/';
        }
      };

      var html = fn(locals);

      // Create files
      mkdirp(outputPath, function(err){
        if (err) {
          console.error(err);
        } else {
          fs.writeFileSync(outputPath + 'index.html', html, 'utf8');
        }
      });

    }

    // For each language run getLang function
    for (var lang in tempLangs){
      getLang(lang, tempLangs[lang]);
    }

  });

}

// Render Sass
exports.renderSass = function(){

  // Output style
  var outputStyle = 'compressed';
  if (data.pretty){
    outputStyle = 'nested';
  }

  // Get CSS
  var css = sass.renderSync({
    file: __dirname + '/' + data.output_dir + '/' + data.sass_dir + '/index.scss',
    outputStyle: outputStyle
  });

  // Create the directory if it doesn't exist
  mkdirp(__dirname + '/' + data.output_dir + '/' + data.css_dir, function(err){
    if (err) {
      console.error(err);
    } else {
      // Create the files
      fs.writeFileSync(__dirname + '/' + data.output_dir + '/' + data.css_dir + '/index.css', css.css, 'utf8');
    }
  });
  
}