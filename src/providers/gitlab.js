'use strict';

const provider = 'gitlab';
const baseUrl = 'https://gitlab.com/api/v3';
const debug = require('debug')(`provider.${ provider }`);

const { apiRequest, format } = require('../helpers.js');
const noop = Function.prototype;

function query(name, options={}, callback=noop) {
  let url = `${ baseUrl }/projects/search/${ name }`;
  let headers = { 'PRIVATE-TOKEN': options.gitlabToken };

  return apiRequest(url, debug, { headers })
    .then((repos) => {
      repos = repos.filter(repo => repo.path === name);
      debug(`Found ${ repos.length } equally named repositories.`);

      let result = { provider, available: repos.length === 0 };
      if (!result.available) {
        let { path:name, path_with_namespace:fullName, web_url:url } = repos[0];
        result.holder = { name, fullName, url };
      }

      debug(`Name "${ name }" is ${ format(result.available, 'available') }`);
      return result;
    })
    .asCallback(callback);
}

module.exports = { query, name: provider };
