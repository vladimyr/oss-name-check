'use strict';

const provider = 'pypi';
const baseUrl = 'https://pypi.python.org';
const debug = require('debug')(`provider.${ provider }`);

const { format, urlExists } = require('../helpers.js');
const noop = Function.prototype;

function query(name, options={}, callback=noop) {
  let url = `${ baseUrl }/pypi/${ name }`;

  return urlExists(url, debug)
    .then((result) => {
      result.provider = provider;
      debug(`Name "${ name }" is ${ format(result.available, 'available') }`);
      return result;
    })
    .nodeify(callback);
}

module.exports = { query, name: provider };
