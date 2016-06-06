'use strict';

var provider = 'gitlab';
var baseUrl = 'https://gitlab.com/api/v3';
var debug = require('debug')(("provider." + provider));

var ref = require('../helpers.js');
var apiRequest = ref.apiRequest;
var noop = Function.prototype;

function query(name, options, callback) {
  if ( options === void 0 ) options={};
  if ( callback === void 0 ) callback=noop;

  var url = baseUrl + "/projects/search/" + name;
  var headers = { 'PRIVATE-TOKEN': options.gitlabToken };

  return apiRequest(url, debug, { headers: headers })
    .then(function (repos) {
      repos = repos.filter(function (repo) { return repo.path === name; });
      debug(("Found " + (repos.length) + " equally named repositories."));

      var result = { available: repos.length === 0 };
      if (!result.available) {
        var ref = repos[0];
        var name$1 = ref.path;
        var fullName = ref.path_with_namespace;
        var url = ref.web_url;
        result.holder = { name: name$1, fullName: fullName, url: url };
      }
      return result;
    })
    .asCallback(callback);
}

module.exports = { query: query, name: provider };
