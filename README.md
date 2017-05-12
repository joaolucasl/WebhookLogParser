# WebhookLogParser

This package offers a simple parser for log files of webhooks. 
Every line in the file is to be formatted as the example:

```
level=info response_body="" request_to="https://grotesquemoon.de" response_headers=map[Content-Type:[application/json; charset=utf-8] Connection:[keep-alive] Runscope-Message-Id:[fb814900-c6bc-4002-8007-e7e06b52abb0] Access-Control-Allow-Credentials:[true] Server:[Runscope-Gateway/1.0]] response_status="200"
```

The parser will account for the fields above, returning strings for simple values or nested objects for `map[...]` values.

## API
### `parse(input: Buffer | string) -> Array<object>`
This function receives an input and parses it, resulting in an object with the parsed values.

### `parseLine(line: string) -> object`
Convenience function to parse single lines, that returns an object instead of an Array with a single element.

## CLI
Also for convenience, the package provides a CLI that outputs the parsing to `stdout`. You can run it 
after installing the dependencies by running:

```
    node bin/cli.js --input examples/log.txt
```

## Examples
There's an example of usage in `examples/count-urls.js`, that will output the 3 most request URLs and the 2 most returned statuses in `log.txt`, which is an example file (that may be used with the CLI as well).

