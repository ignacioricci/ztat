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
      "languages": ["es", "en"]
    },
    {
      "name": "about",
      "languages": ["es", "en"]
    }
  ],
```
### default_language
```
"default_language": "en"
```
### assets_url
```
"assets_url": "../images/"
```
### styles_url
```
"styles_url": "../styles/"
```
### javascript_url
```
"javascript_url": "../js/"
```
### prettify (false for minified)
```
"prettify": false
```

## With ❤ by

- Ignacio Ricci (VP of Product @ Mango)
 - E-mail: [ignacio.ricci@gmail.com](mailto:ignacio.ricci@gmail.com)
 - Twitter: [@ignacioricci](http://twitter.com/ignacioricci)
 - Web: [http://ignacioricci.com](http://ignacioricci.com)

Special thanks to: <a href="http://twitter.com/impronunciable">Dan Zajdband</a>.

## License
MIT license. Copyright © 2015 [Ignacio Ricci](http://ignacioricci.com).