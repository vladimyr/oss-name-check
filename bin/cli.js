#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const chalk = require('chalk');
const figures = require('figures');
const Table = require('cli-table');
const pkg = require('../package.json');

const isNameAvailable = require('../check-name.js');

const argv = yargs.version(pkg.version)
  .usage('\n$0 [name]')
  .required(1, chalk.red('Name parameter is required!'))
  .option('j', {
    alias: 'json',
    type: 'boolean',
    describe: 'print results in JSON format'
  })
  .help('h').alias('h', 'help')
  .argv;

let name = argv._[0];
let options = { gitlabToken: process.env.GITLAB_TOKEN };

isNameAvailable(name, options)
  .then(results => {
    if (argv.json) {
      printJson(name, results);
    } else {
      printTable(name, results);
    }
  });

function printTable(name, results) {
  let table = new Table({
    head: [
      chalk.bold.white('Service'),
      chalk.bold.white('Available?')
    ],
    colAligns: [ 'left', 'middle' ]
  });

  results.forEach(result =>
    table.push([ chalk.blue(result.provider), getIndicator(result) ]));

  console.log('\nSearch query: %s', chalk.magenta(name));
  console.log('%s\n', table.toString());

  function getIndicator(result) {
    if (!result.success) return chalk.yellow(figures.warning);
    return result.available ? chalk.green(figures.tick)
                            : chalk.red(figures.cross);
  }
}

function printJson(name, results) {
  let data = {
    searchQuery: name,
    results: results
  };
  console.log('\n%s\n', JSON.stringify(data, null, 2));
}
