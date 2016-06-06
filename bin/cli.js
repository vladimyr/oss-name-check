#!/usr/bin/env node

'use strict';

var yargs = require('yargs');
var chalk = require('chalk');
var figures = require('figures');
var Table = require('cli-table');
var format = require('util').format;
var ver = require('../package.json').version;

var isNameAvailable = require('../dist/check-name.js');

function printJson(results) {
  console.log(format('\n%s\n', JSON.stringify(results, null, 2)));
}

function printTable(name, results) {
  var table = new Table({
    head: [
      chalk.bold.white('Service'),
      chalk.bold.white('Available?')
    ],
    colAligns: [ 'left', 'middle' ]
  });

  function getAvailability(result) {
    var indicator = chalk.yellow(figures.warning);
    if (!result.success) return indicator;

    if (result.available) {
      indicator = chalk.green(figures.tick);
    } else {
      indicator = chalk.red(figures.cross);
    }

    return indicator;
  }

  results.forEach(function(result) {
    table.push([ chalk.blue(result.provider), getAvailability(result) ]);
  });

  console.log('\nSearch query: %s', chalk.magenta(name));
  console.log(format('%s\n', table.toString()));
}

var argv = yargs.version(ver)
  .usage('\n$0 [name]')
  .required(1, chalk.red('Name parameter is required!'))
  .option('j', {
    alias: 'json',
    type: 'boolean',
    describe: 'print results in JSON format'
  })
  .help('h').alias('h', 'help')
  .argv;

var name = argv._[0];

isNameAvailable(name)
  .then(function complete(results) {
    if (argv.json) {
      var data = {
        searchQuery: name,
        results: results
      };
      printJson(data);
      return;
    }

    printTable(name, results);
  });
