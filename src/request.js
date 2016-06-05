'use strict';

const Promise = require('bluebird');
const request = require('request');
const { name, version } = require('../package.json');

let req = request.defaults({
  headers: { 'User-Agent': `${ name }/${ version }` }
});

module.exports = Promise.promisifyAll(req, { multiArgs: true });
