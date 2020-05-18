'use strict';

const yargs = require('yargs');
const parseReceipt = require('./src/parse_receipt.js');
const parseReceipts = require('./src/parse_receipts.js');

yargs
  .command(
    'parse [file]',
    'parse receipt file',
    builder => {
      builder.positional('dest', { describe: 'output file destination' });
    },
    argv => parseReceipt(argv))
  .command(
    'parse-folder [folder]',
    'parse receipts in folder',
    builder => {
      builder.positional('dest', { describe: 'output folder destination' });
    },
    argv => parseReceipts(argv))
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .argv
