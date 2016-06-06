'use strict';

const provider = 'rubygems';
const baseUrl = 'https://rubygems.org';
const debug = require('debug')(`provider.${ provider }`);

const { urlExists } = require('../helpers.js');
const noop = Function.prototype;

function query(name, options={}, callback=noop) {
  let url = `${ baseUrl }/gems/${ name }`;
  return urlExists(url, debug)
    .nodeify(callback);
}

module.exports = { query, name: provider };
