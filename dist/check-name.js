'use strict';

var Promise = require('bluebird');
var providers = require('./providers/');
var debug = require('debug')('runner');
var noop = Function.prototype;

function isNameAvailable(name, options, callback) {
  if ( options === void 0 ) options={};
  if ( callback === void 0 ) callback=noop;

  debug(("Checking if \"" + name + "\" is available..."));
  debug(("provided options: " + (JSON.stringify(options))));

  return Promise.map(providers, function (ref) {
    var query = ref.query;
    var provider = ref.name;

    return query(name, options)
      .then(function (result) { result.success = true; return result; })
      .error(function (err) { return ({ success: false, error: err, provider: provider }); });
  }).asCallback(callback);
}

module.exports = isNameAvailable;

