'use strict';

var Promise = require('bluebird');
var request = require('request');
var ref = require('../package.json');
var name = ref.name;
var version = ref.version;

var req = request.defaults({
  headers: { 'User-Agent': (name + "/" + version) }
});

module.exports = Promise.promisifyAll(req, { multiArgs: true });
