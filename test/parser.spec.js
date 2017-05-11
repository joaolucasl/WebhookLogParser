const { test } = require('ava');
const LogParser = require('../src/index.js');

function getParserResult(source) {
  return LogParser.parse(source);
}

test('.parse() should return an array', (t) => {
  const source = 'level=info response_body="" request_to="https://woodenoyster.com.br" response_headers=map[Content-Type:[text/html; charset=utf-8] X-Powered-By:[Phusion Passenger (mod_rails/mod_rack) 3.0.17] X-Rack-Cache:[invalidate, pass] X-Runtime:[0.034645] Connection:[keep-alive] Set-Cookie:[X-Mapping-fjhppofk=A67D55AC8119CAD031E35EC35B4BCFFD; path=/] Keep-Alive:[timeout=20] Cache-Control:[max-age=0, private, must-revalidate] Status:[200] Etag:[7215ee9c7d9dc229d2921a40e899ec5f] Vary:[Accept-Encoding] X-Ua-Compatible:[IE=Edge,chrome=1] Server:[nginx] X-Request-Id:[1381e8cb388db085cdc3bac457dab9bf] Date:[Tue, 07 Jul 2015 18:29:52 GMT]] response_status="204"';

  const result = getParserResult(source);

  t.true(Array.isArray(result));
});

test('.parse() should return an object with the right shape', (t) => {
  const source = 'level=info response_body="" request_to="https://woodenoyster.com.br" response_headers=map[Content-Type:[text/html; charset=utf-8] X-Powered-By:[Phusion Passenger (mod_rails/mod_rack) 3.0.17] X-Rack-Cache:[invalidate, pass] X-Runtime:[0.034645] Connection:[keep-alive] Set-Cookie:[X-Mapping-fjhppofk=A67D55AC8119CAD031E35EC35B4BCFFD; path=/] Keep-Alive:[timeout=20] Cache-Control:[max-age=0, private, must-revalidate] Status:[200] Etag:[7215ee9c7d9dc229d2921a40e899ec5f] Vary:[Accept-Encoding] X-Ua-Compatible:[IE=Edge,chrome=1] Server:[nginx] X-Request-Id:[1381e8cb388db085cdc3bac457dab9bf] Date:[Tue, 07 Jul 2015 18:29:52 GMT]] response_status="204"';

  const result = getParserResult(source);

  // 5 assertions per line
  t.plan(result.length * 5);

  result.forEach((log) => {
    t.not(log.level, undefined);
    t.not(log.request_to, undefined);
    t.not(log.response_body, undefined);
    t.not(log.response_status, undefined);
    t.not(log.response_headers, undefined);
  });
});

