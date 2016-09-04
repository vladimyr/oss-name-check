'use strict';

const provider = 'gitlab';
const baseUrl = 'https://gitlab.com/api/v3';
const debug = require('debug')(`provider.${ provider }`);

const apiRequest = require('../lib/helpers.js').apiRequest;
const noop = Function.prototype;

function query(name, options, callback) {
  options = options || {};
  callback = callback || noop;

  let url = `${ baseUrl }/projects/search/${ name }`;
  let headers = { 'PRIVATE-TOKEN': options.gitlabToken };

  return apiRequest(url, debug, { headers })
    .then(repos => {
      repos = repos.filter(repo => repo.path === name);
      debug(`Found ${ repos.length } equally named repositories.`);

      let result = { available: repos.length === 0 };
      if (!result.available) {
        let repo = repos[0];
        result.holder = {
          name: repo.path,
          fullName: repo.path_with_namespace,
          url: repo.web_url
        };
      }

      return result;
    })
    .asCallback(callback);
}

module.exports = { query, provider };
