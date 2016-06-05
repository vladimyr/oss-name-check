'use strict';

const isNameAvailable = require('../check-name.js');

const minimist = require('minimist');
const args = minimist(process.argv.slice(2));

let name = args._[0] || args.name;
if (!name) {
  console.error('Target name is not provided!');
  process.exit(1);
}

const options = {
  gitlabToken: process.env.GITLAB_TOKEN
};

isNameAvailable(name, options)
  .then((results) => console.log(JSON.stringify(results, null, 2)));
