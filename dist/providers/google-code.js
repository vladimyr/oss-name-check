'use strict';

var provider = 'google-code';
var baseUrl = 'https://code.google.com';
var debug = require('debug')(("provider." + provider));

var ref = require('../helpers.js');
var urlExists = ref.urlExists;
var noop = Function.prototype;

function query(name, options, callback) {
  if ( options === void 0 ) options={};
  if ( callback === void 0 ) callback=noop;

  var url = baseUrl + "/p/" + name + "/";
  return urlExists(url, debug)
    .nodeify(callback);
}

module.exports = { query: query, name: provider };
