'use strict';

const provider = 'google-code';
const baseUrl = 'https://code.google.com';
const debug = require('debug')(`provider.${ provider }`);

const urlExists = require('../lib/helpers.js').urlExists;
const noop = Function.prototype;

function query(name, options, callback) {
  options = options || {};
  callback = callback || noop;

  let url = `${ baseUrl }/p/${ name }/`;
  return urlExists(url, debug, callback);
}

module.exports = { query, provider };
