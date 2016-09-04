'use strict';

const provider = 'pypi';
const baseUrl = 'https://pypi.python.org';
const debug = require('debug')(`provider.${ provider }`);

const urlExists = require('../lib/helpers.js').urlExists;
const noop = Function.prototype;

function query(name, options, callback) {
  options = options || {};
  callback = callback || noop;

  let url = `${ baseUrl }/pypi/${ name }`;
  return urlExists(url, debug, callback);
}

module.exports = { query, provider };
