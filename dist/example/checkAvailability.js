'use strict';

var isNameAvailable = require('../check-name.js');

var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

var name = args._[0] || args.name;
if (!name) {
  console.error('Target name is not provided!');
  process.exit(1);
}

var options = {
  gitlabToken: process.env.GITLAB_TOKEN
};

isNameAvailable(name, options)
  .then(function (results) { return console.log(JSON.stringify(results, null, 2)); });
