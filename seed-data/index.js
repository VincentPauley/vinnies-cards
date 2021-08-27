const fs = require('fs');
const tableDir = '/tables';

// get all datafile relative paths
const dataFiles = fs
  .readdirSync(__dirname + tableDir)
  .map(f => `./${tableDir}/${f}`);

// export all datafiles
module.exports = dataFiles.map(dataFile => require(dataFile));
