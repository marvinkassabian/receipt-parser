'use strict';

const fs = require('fs');
var path = require('path');
const parseRecipt = require('./parse_receipt.js');

module.exports = ({ folder, dest, verbose }) => {
  const log = message => {
    if (verbose)
      console.log(message);
  };

  fs.readdir(folder, (_err, files) => {
    files.forEach(file => {
      log(file);
      const srcFile = path.join(folder, file);
      const destFile = path.join(dest, `${file}.csv`);
      parseRecipt({
        file: srcFile,
        verbose: verbose,
        dest: destFile
      });
    });
  });
};