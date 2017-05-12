const fs = require('fs');
const path = require('path');
const parser = require('../src/index.js');

const countOccurencesInList = (list, property) =>
  list.reduce((counters, item) => {
    const toCheck = item[property];
    const valueCount =
      counters.hasOwnProperty(toCheck) ? counters[toCheck] + 1 : 1;

    const updatedCounter = Object.assign({}, counters, { [toCheck]: valueCount });

    return updatedCounter;
  }, {});

const getTopN = (counter, n) => {
  const pairs = Object.keys(counter).map(key => [key, counter[key]]);
  const orderedPairs = pairs.sort((a, b) => b[1] - a[1]);
  return orderedPairs.slice(0, n);
};

const logFilePath = path.join(__dirname, 'log.txt');

fs.readFile(logFilePath, 'utf8', (err, data) => {
  if (err) throw err;

  const parsedFile = parser.parse(data);

  const urlsByCount = countOccurencesInList(parsedFile, 'request_to');
  const statusByCount = countOccurencesInList(parsedFile, 'response_status');

  console.log('Most requested URLs:');
  console.log(getTopN(urlsByCount, 3));

  console.log('Most returned statuses:');
  console.log(getTopN(statusByCount, 2));
});
