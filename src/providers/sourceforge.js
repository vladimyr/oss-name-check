'use strict';

const provider = 'sourceforge';
const baseUrl = 'https://sourceforge.net';
const debug = require('debug')(`provider.${ provider }`);

const { urlExists } = require('../helpers.js');
const noop = Function.prototype;

function query(name, options={}, callback=noop) {
  let url = `${ baseUrl }/projects/${ name }/`;
  return urlExists(url, debug)
    .nodeify(callback);
}

module.exports = { query, name: provider };
