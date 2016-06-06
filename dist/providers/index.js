'use strict';

var ref = require('path');
var resolvePath = ref.resolve;
var ref$1 = require('fs');
var readDir = ref$1.readdirSync;

var providers = [];

var path = resolvePath(__dirname);
readDir(path).map(function (filename) {
  if (filename === 'index.js') return;

  var filepath = resolvePath(__dirname, filename);
  var provider = require(filepath);
  providers.push(provider);
});

module.exports = providers;
