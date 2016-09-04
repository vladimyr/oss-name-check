'use strict';

const provider = 'github';
const baseUrl = 'https://api.github.com';
const debug = require('debug')(`provider.${ provider }`);

const apiRequest = require('../lib/helpers.js').apiRequest;
const noop = Function.prototype;

function query(name, options, callback) {
  options = options || {};
  callback = callback || noop;

  let url = `${ baseUrl }/search/repositories?q=${ name } in:name`;

  return apiRequest(url, debug)
    .then(data => {
      let repos = data.items;
      repos = repos.filter(repo => repo.name === name);
      debug(`Found ${ repos.length } equally named repositories.`);

      let result = { available: repos.length === 0 };
      if (!result.available) {
        let repo = repos[0];
        result.holder = {
          name: repo.name,
          fullName: repo.full_name,
          url: repo.html_url
        };
      }

      return result;
    })
    .asCallback(callback);
}

module.exports = { query, provider };
