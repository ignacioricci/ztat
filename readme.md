# Ztat
> A simple static website generator for NodeJS

## Prerequisites

NodeJS, NPM.

## Installation

1. Download the repository
2. **npm-install** dependencies

## Usage

Run in your console:

```
node generator.js
```

## Directory structure

- templates/
  - section_name/
     - template.jade
     - en.json
     - es.json
     - xx.json

## Configuration options

### templates

```
"templates":[
    {
      "name": "index",
      "languages": {
        "en": "index",
        "es": "index"
      }
    },
    {
      "name": "about",
      "languages": {
        "en": "about",
        "es": "sobre-nosotros"
      }
    }
  ],
```
### default_language
```
"default_language": "en"
```
### output_dir
```
"output_dir": "/www/",
```
### assets_dir
```
"assets_dir": "/www/images/",
```
### css_dir
```
"css_dir": "/www/styles/css/",
```
### sass_dir
```
"sass_dir": "/www/styles/scss/",
```
### javascript_dir
```
"javascript_dir": "../js/"
```
### fonts_dir
```
"fonts_dir": "../js/"
```
### pretty (On true minifies HTML and SASS)
```
"pretty": false
```

## You can also use the following variables and function on your template

### Variables

* output_dir
* assets_dir
* css_dir
* sass_dir
* javascript_dir
* fonts_dir

* current_page
* current_language

### Functions

```
page_link('page-name')
```

Automatically builds page links for all languages


## With ❤ by

- Ignacio Ricci (VP of Product @ Mango)
 - E-mail: [ignacio.ricci@gmail.com](mailto:ignacio.ricci@gmail.com)
 - Twitter: [@ignacioricci](http://twitter.com/ignacioricci)
 - Web: [http://ignacioricci.com](http://ignacioricci.com)

Special thanks to: <a href="http://twitter.com/impronunciable">Dan Zajdband</a> and Guillermo Paz <a href="http://twitter.com/pazguille">Guillermo Paz</a>.

## License
MIT license. Copyright © 2015 [Ignacio Ricci](http://ignacioricci.com).