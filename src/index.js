const matchers = require('./matchers');

const parseLine = (line) => {
  const result = {};
  Object
    .entries(matchers)
    .forEach(([name, matcher]) => {
      result[name] = matcher(line);
    });

  return result;
};

const parse = (input) => {
  const source = String(input); // Ensure Buffers are also converted
  const parsingResult = source.split('\n').map(parseLine); // Split and parse the lines

  return parsingResult;
};

module.exports = {
  parse,
  parseLine,
};
