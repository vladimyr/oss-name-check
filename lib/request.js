'use strict';

const Promise = require('bluebird');
const request = require('request');
const pkg = require('../package.json');

let req = request.defaults({
  headers: { 'User-Agent': `${ pkg.name }/${ pkg.version }` }
});

module.exports = Promise.promisifyAll(req, { multiArgs: true });
