// Require dependencies
var fs = require('fs');
var jade = require('jade');
var mkdirp = require('mkdirp');

// Load config
var data = require('./config.json');

// Parse config
data.templates.forEach(function(template){
  var languages = template.languages;
  var name = template.name;
  var source = fs.readFileSync(__dirname + '/templates/' + name + '/' + 'template.jade');
  var fn = jade.compile(source, {doctype: 'html', pretty: data.development});

  // For each language create an html
  languages.forEach(function(lang){

    var locals = {};
    var i18n = require(__dirname + '/templates/' + name + '/' + lang + '.json');
    var local_dir = '';
    if(data.development == true){
      if (name != 'index' && data.default_language != lang){
        local_dir = '../../';
      }
      else if (name == 'index' && data.default_language == lang){
        local_dir = '';
      }
      else {
        local_dir = '../';
      }
    }
    for(var i in i18n) {
      locals[i] = i18n[i];
    }
    locals.assets_url = local_dir + data.assets_url + '/';
    locals.styles_url = local_dir + data.styles_url + '/';
    locals.javascript_url = local_dir + data.javascript_url + '/';
    locals.current_language = lang;

    if (data.default_language == lang){
      var directory = __dirname + '/www/';
    }
    else {
      var directory = __dirname + '/www/' + lang + '/';
    }
    if (name !== 'index'){
      directory += name + '/';
    }
    var html = fn(locals);

    // Create directory if it doesn't exist
    mkdirp(directory, function(err) {
      if (err) {
        console.error(err);
      } else {
        // Create the files
        fs.writeFileSync(directory + 'index.html', html, 'utf8');
      }
    });

  });

});