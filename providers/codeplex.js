'use strict';

const provider = 'codeplex';
const baseUrl = projectName => `https://${ projectName }.codeplex.com`;
const debug = require('debug')(`provider.${ provider }`);

const urlExists = require('../lib/helpers.js').urlExists;
const noop = Function.prototype;

function query(name, options, callback) {
  options = options || {};
  callback = callback || noop;

  let url = baseUrl(name);
  return urlExists(url, debug, callback);
}

module.exports = { query, provider };
