'use strict';

var provider = 'github';
var baseUrl = 'https://api.github.com';
var debug = require('debug')(("provider." + provider));

var ref = require('../helpers.js');
var apiRequest = ref.apiRequest;
var format = ref.format;
var noop = Function.prototype;

function query(name, options, callback) {
  if ( options === void 0 ) options={};
  if ( callback === void 0 ) callback=noop;

  var url = baseUrl + "/search/repositories?q=" + name + " in:name";

  return apiRequest(url, debug)
    .then(function (data) {
      var repos = data.items;
      repos = repos.filter(function (repo) { return repo.name === name; });
      debug(("Found " + (repos.length) + " equally named repositories."));

      var result = { provider: provider, available: repos.length === 0 };
      if (!result.available) {
        var ref = repos[0];
        var name$1 = ref.name;
        var fullName = ref.full_name;
        var url = ref.html_url;
        result.holder = { name: name$1, fullName: fullName, url: url };
      }

      debug(("Name \"" + name + "\" is " + (format(result.available, 'available'))));
      return result;
    })
    .asCallback(callback);
}

module.exports = { query: query, name: provider };
