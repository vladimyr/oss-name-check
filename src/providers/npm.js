'use strict';

const provider = 'npm';
const baseUrl = 'https://www.npmjs.com';
const debug = require('debug')(`provider.${ provider }`);

const { urlExists } = require('../helpers.js');
const noop = Function.prototype;

function query(name, options={}, callback=noop) {
  let url = `${ baseUrl }/package/${ name }`;
  return urlExists(url, debug)
    .nodeify(callback);
}

module.exports = { query, name: provider };
