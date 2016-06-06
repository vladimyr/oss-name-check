'use strict';

var Promise = require('bluebird');
var request = require('./request.js');

function format(state, word) {
  if (!state) return ("not " + word);
  return '' + word;
}

function urlExists(url, debug) {
  debug(("Creating http request to: url=" + url));
  return request.getAsync(url)
    .then(function (ref) {
      var resp = ref[0];

      debug(("Received response: " + (resp.statusCode) + ", " + (resp.statusMessage)));

      var notFound = resp.statusCode === 404;
      debug(("Requested url is " + (format(!notFound, 'found')) + "."));

      var result = { available: notFound };
      if (!notFound) result.holder = { url: url };

      return result;
    });
}

function apiRequest(url, debug, options) {
  if ( options === void 0 ) options={};

  debug(("Creating api request to: url=" + url));
  return request.getAsync(url, options)
    .spread(function (resp, body) {
      var status = (resp.statusCode) + ", " + (resp.statusMessage);
      debug(("Received response: " + status));

      if (resp.statusCode !== 200) {
        var msg = "Request to provder's api failed! [code=" + status + "]";
        debug(("Error: " + msg));
        var err = new Promise.OperationalError(msg);
        return Promise.reject(err);
      }

      return JSON.parse(body);
    });
}

module.exports = {
  format: format, urlExists: urlExists, apiRequest: apiRequest
};
