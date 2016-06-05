'use strict';

const { resolve:resolvePath } = require('path');
const { readdirSync:readDir } = require('fs');

let providers = [];

let path = resolvePath(__dirname);
readDir(path).map((filename) => {
  if (filename === 'index.js') return;

  let filepath = resolvePath(__dirname, filename);
  let provider = require(filepath);
  providers.push(provider);
});

module.exports = providers;
