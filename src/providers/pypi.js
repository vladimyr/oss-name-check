'use strict';

const provider = 'pypi';
const baseUrl = 'https://pypi.python.org';
const debug = require('debug')(`provider.${ provider }`);

const { urlExists } = require('../helpers.js');
const noop = Function.prototype;

function query(name, options={}, callback=noop) {
  let url = `${ baseUrl }/pypi/${ name }`;
  return urlExists(url, debug)
    .nodeify(callback);
}

module.exports = { query, name: provider };
