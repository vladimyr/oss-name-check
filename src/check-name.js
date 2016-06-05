'use strict';

const Promise = require('bluebird');
const providers = require('./providers/');
const debug = require('debug')('runner');
const noop = Function.prototype;

function isNameAvailable(name, options={}, callback=noop) {
  debug(`Checking if "${ name }" is available...`);
  debug(`provided options: ${ JSON.stringify(options) }`);

  return Promise.map(providers, ({ query, name:provider }) => {
    return query(name, options)
      .then((result) => { result.success = true; return result; })
      .error((err) => ({ success: false, error: err }));
  }).asCallback(callback);
}

module.exports = isNameAvailable;

