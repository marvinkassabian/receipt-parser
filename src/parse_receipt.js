'use strict';

const readline = require('readline');
const fs = require('fs');
var path = require('path');
const parseLines = require('./parse_lines.js');

module.exports = ({ file, dest, verbose }) => {
  const log = message => {
    if (verbose)
      console.log(message);
  };

  log({ file, dest, verbose });

  const lines = [];

  readline.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    console: false
  }).on('line', line => {
    log(`[line]: ${line}`)
    lines.push(line);
  }).on('close', () => {
    const parsedLines = parseLines({ verbose })(lines);
    log(parsedLines);
    const writeStream = fs.createWriteStream(dest);

    var fileName = path.parse(file).base;

    parsedLines.forEach(line => {
      log(`[write-line]: ${line}`)
      writeStream.write(`${line.name},${line.cost},${fileName}\r\n`);
    });

    writeStream.end();
  });
};