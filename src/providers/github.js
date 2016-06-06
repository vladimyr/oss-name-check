'use strict';

const provider = 'github';
const baseUrl = 'https://api.github.com';
const debug = require('debug')(`provider.${ provider }`);

const { apiRequest } = require('../helpers.js');
const noop = Function.prototype;

function query(name, options={}, callback=noop) {
  let url = `${ baseUrl }/search/repositories?q=${ name } in:name`;

  return apiRequest(url, debug)
    .then((data) => {
      let { items:repos } = data;
      repos = repos.filter(repo => repo.name === name);
      debug(`Found ${ repos.length } equally named repositories.`);

      let result = { available: repos.length === 0 };
      if (!result.available) {
        let { name, full_name:fullName, html_url:url } = repos[0];
        result.holder = { name, fullName, url };
      }
      return result;
    })
    .asCallback(callback);
}

module.exports = { query, name: provider };
