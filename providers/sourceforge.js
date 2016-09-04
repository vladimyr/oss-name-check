'use strict';

const provider = 'sourceforge';
const baseUrl = 'https://sourceforge.net';
const debug = require('debug')(`provider.${ provider }`);

const urlExists = require('../lib/helpers.js').urlExists;
const noop = Function.prototype;

function query(name, options, callback) {
  options = options || {};
  callback = callback || noop;

  let url = `${ baseUrl }/projects/${ name }/`;
  return urlExists(url, debug, callback);
}

module.exports = { query, provider };
