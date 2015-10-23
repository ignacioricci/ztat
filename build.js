'use strict';

// Require dependencies
var fs = require('fs');
var child_process = require('child_process');
var jade = require('jade');
var mkdirp = require('mkdirp');
var sass = require('node-sass');

// Load config
var data = require('./config.json');

// Render Jade
exports.renderJade = function(){

  // Parse config
  data.templates.forEach(function(template){

    var languages = template.languages;
    var name = template.name;
    var source = fs.readFileSync(__dirname + '/templates/' + name + '/' + 'template.jade');
    var fn = jade.compile(source, {doctype: 'html', filename:source, pretty: data.pretty});

    // Get languages
    function getLang(lang, url){
      var locals = {};
      var i18n = require(__dirname + '/templates/' + name + '/' + lang + '.json');
      var relative_path = '';

      // Build relative paths
      if(data.relative_urls){
        if (name != 'index' && data.default_language != lang){
          relative_path = '../../';
        }
        else if (name == 'index' && data.default_language == lang){
          relative_path = '';
        }
        else {
          relative_path = '../';
        }
      }

      // Apply locals
      for(var i in i18n) {
        locals[i] = i18n[i];
      }

      // Build output URLs
      if (data.default_language == lang){
        var output = __dirname + data.output_dir;
      }
      else {
        var output = __dirname + data.output_dir + lang + '/';
      }
      if (name !== 'index'){
        output += url + '/';
      }

      // Create variables to be used in the templates
      if(data.relative_urls){
        locals.assets_dir = relative_path + data.assets_dir.replace(data.output_dir, '');
        locals.css_dir = relative_path + data.css_dir.replace(data.output_dir, '');
        locals.fonts_dir = relative_path + data.fonts_dir.replace(data.output_dir, '');
        locals.javascript_dir = relative_path + data.javascript_dir.replace(data.output_dir, '');
      }
      else {
        locals.assets_dir = data.assets_dir;
        locals.css_dir = data.css_dir;
        locals.fonts_dir = data.fonts_dir;
        locals.javascript_dir = data.javascript_dir;
      }

      locals.current_language = lang;

      // Generate automatic page links
      if(data.relative_urls){
        locals.page_link = function(name){
          var page = data.templates.find(function(t){return t.name === name});
          if (name == 'index'){
            return '../';
          }
          else if (data.default_language == lang) {
            return output.replace(__dirname + data.output_dir, '') + page.languages[lang] + '/index.html';
          }
          else {
            return output.replace(__dirname + data.output_dir + lang + '/', '') + page.languages[lang] + '/index.html';
          }
        };
      }

      var html = fn(locals);


      // Create the directory if it doesn't exist
      mkdirp(output, function(err){
        if (err) {
          console.error(err);
        } else {
          // Create the files
          fs.writeFileSync(output + 'index.html', html, 'utf8');
        }
      });

    }

    // For each language create an html
    for (var lang in languages){
      getLang(lang, languages[lang]);
    }

  });

}

// Render Sass
exports.renderSass = function(){

  var cssOutputStyle = 'compressed';

  if (data.pretty){
    cssOutputStyle = 'nested';
  }

  var result = sass.renderSync({
    file: __dirname + data.sass_dir + '/index.scss',
    outputStyle: cssOutputStyle
  });

  // Create the directory if it doesn't exist
  mkdirp(__dirname + data.css_dir, function(err){
    if (err) {
      console.error(err);
    } else {
      // Create the files
      fs.writeFileSync(__dirname + data.css_dir + '/index.css', result.css, 'utf8');
    }
  });
  
}