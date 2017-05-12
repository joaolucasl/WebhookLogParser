const fs = require('fs');
const yargs = require('yargs');
const parser = require('../src/index.js');

const cliArgs =
  yargs
    .usage('Usage: $0 command')
    .command('input', 'the path to the input file')
    .demandOption('input')
    .argv;

const inputFile = cliArgs.input;

fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    throw Error(`It wasn't possible to parse input file. Please check the given input path. ${err.message}`);
  }

  const parsedFile = parser.parse(data);

  process.stdout.write(JSON.stringify(parsedFile));
});
