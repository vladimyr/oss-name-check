'use strict';

const Promise = require('bluebird');
const request = require('./request.js');

function format(state, word) {
  if (!state) return `not ${ word }`;
  return '' + word;
}

function urlExists(url, debug) {
  debug(`Creating http request to: url=${ url }`);
  return request.getAsync(url)
    .then(([ resp ]) => {
      debug(`Received response: ${ resp.statusCode }, ${ resp.statusMessage }`);

      let notFound = resp.statusCode === 404;
      debug(`Requested url is ${ format(!notFound, 'found') }.`);

      let result = { available: notFound };
      if (!notFound) result.holder = { url };

      return result;
    });
}

function apiRequest(url, debug, options={}) {
  debug(`Creating api request to: url=${ url }`);
  return request.getAsync(url, options)
    .spread((resp, body) => {
      let status = `${ resp.statusCode }, ${ resp.statusMessage }`;
      debug(`Received response: ${ status }`);

      if (resp.statusCode !== 200) {
        let msg = `Request to provder's api failed! [code=${ status }]`;
        debug(`Error: ${ msg }`);
        let err = new Promise.OperationalError(msg);
        return Promise.reject(err);
      }

      return JSON.parse(body);
    });
}

module.exports = {
  format, urlExists, apiRequest
};
