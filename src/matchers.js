
const level = line => line.match(/level=(\w+)/)[1];

const requestTo = line => line.match(/(?:request_to=")(.*?)(?:")/)[1];

const responseBody = line => line.match(/(?:response_body=")(.*?)(?:")/)[1];

const responseStatus = line => line.match(/(?:response_status=")(.*?)(?:")/)[1];

const responseHeaders = (line) => {
  const rawMatch = line.match(/(?:response_headers=map\[)(.*?\])(?:\])/)[1];
  const exploder = /(.*?)(?::\[)(.*?)(?:\])/y;

  const headers = {};
  let matches;

  // Sticky (/y) Regexes return 'null' if no matches
  while ((matches = exploder.exec(rawMatch))) {
    const key = matches[1];
    const value = matches[2];

    headers[key] = value;
  }

  return headers;
};

module.exports = {
  level,
  request_to: requestTo,
  response_body: responseBody,
  response_status: responseStatus,
  response_headers: responseHeaders,
};
