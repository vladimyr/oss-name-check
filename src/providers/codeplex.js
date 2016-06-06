'use strict';

const provider = 'codeplex';
const baseUrl = (projectName) => `https://${ projectName }.codeplex.com`;
const debug = require('debug')(`provider.${ provider }`);

const { urlExists } = require('../helpers.js');
const noop = Function.prototype;

function query(name, options={}, callback=noop) {
  let url = baseUrl(name);
  return urlExists(url, debug)
    .nodeify(callback);
}

module.exports = { query, name: provider };
