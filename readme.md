# Ztat
> A simple i18n static website generator for NodeJS

This framework is based on <a href="http://jade-lang.com/">Jade's</a> templating system and SASS.

## Prerequisites

* <a href="https://nodejs.org/en/">NodeJS</a>
* <a href="https://www.npmjs.com/">NPM</a>

## Installation and usage

### Installation

1. Download the repository
2. **npm-install** dependencies

### Usage

To compile Jade or SASS just one time use in the **command line**:

```
node generator.js
```

To run a watcher waiting for changes use in the **command line**:

```
node watch.js
```

## Directory structure

- layout
  - layout.jade
- templates/
  - section_name/
     - template.jade
     - en.json
     - es.json
     - xx.json

## Configuration options

#### templates *(object)*
Indicates the template list, their languages and URL's

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
#### use_layout *(boolean)*

Defines wether to use a layout or not. **The layout is not compiled.**

```
"use_layout": true
```
#### default_language *(string)*

Defines the default language. This language will compile on the root of the output folder.

```
"default_language": "en"
```
### base_url *(string)*

The base URL for the website navigation

```
http://localhost:3000/www/
```

### output_dir *(string)*

The output directory

```
"output_dir": "www"
```
### assets_dir *(string)*

The asset's directory inside the output directory

```
"assets_dir": "images"
```
### css_dir *(string)*

The css directory inside the output directory

```
"css_dir": "styles/css"
```
### sass_dir *(string)*

The SASS directory inside the output directory

```
"sass_dir": "styles/scss"
```
### javascript_dir *(string)*

The javascript's directory inside the output directory

```
"javascript_dir": "js"
```
### fonts_dir *(string)*

The font's directory inside the output directory

```
"fonts_dir": "fonts"
```
### pretty *(boolean)*

Defines wether the output will be minified or not.
**On true: minifies HTML and SASS.**

```
"pretty": false
```

## Variables and functions for templates

### Variables from configuration

* ``default_language``
* ``output_dir``
* ``assets_dir``
* ``css_dir``
* ``sass_dir``
* ``javascript_dir``
* ``fonts_dir``

### Other variables

* ``current_page`` *(Returns current page name)*
* ``current_language`` *(Returns current language)*

### Functions

#### page_link('*name*')

Creates an hyperlink URL to be used inside the *href* of **&lt;/a&gt;** tags.

```
a(href=page_link('about')) About
```

It will automatically adjust the url according to the ``current_language``

## With ❤ by

- Ignacio Ricci (VP of Product @ Mango)
 - E-mail: [ignacio.ricci@gmail.com](mailto:ignacio.ricci@gmail.com)
 - Twitter: [@ignacioricci](http://twitter.com/ignacioricci)
 - Web: [http://ignacioricci.com](http://ignacioricci.com)

Special thanks to: <a href="http://twitter.com/impronunciable">Dan Zajdband</a> and <a href="http://twitter.com/pazguille">Guillermo Paz</a>.

## License
MIT license. Copyright © 2015 [Ignacio Ricci](http://ignacioricci.com).