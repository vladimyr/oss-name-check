'use strict';

var provider = 'sourceforge';
var baseUrl = 'https://sourceforge.net';
var debug = require('debug')(("provider." + provider));

var ref = require('../helpers.js');
var urlExists = ref.urlExists;
var noop = Function.prototype;

function query(name, options, callback) {
  if ( options === void 0 ) options={};
  if ( callback === void 0 ) callback=noop;

  var url = baseUrl + "/projects/" + name + "/";
  return urlExists(url, debug)
    .nodeify(callback);
}

module.exports = { query: query, name: provider };
