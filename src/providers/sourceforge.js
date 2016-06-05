'use strict';

const provider = 'sourceforge';
const baseUrl = 'https://sourceforge.net';
const debug = require('debug')(`provider.${ provider }`);

const { format, urlExists } = require('../helpers.js');
const noop = Function.prototype;

function query(name, options={}, callback=noop) {
  let url = `${ baseUrl }/projects/${ name }/`;

  return urlExists(url, debug)
    .then((result) => {
      result.provider = provider;
      debug(`Name "${ name }" is ${ format(result.available, 'available') }`);
      return result;
    })
    .nodeify(callback);
}

module.exports = { query, name: provider };
