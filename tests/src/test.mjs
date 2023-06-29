import {strictEqual} from 'assert';
import {randomBytes} from 'crypto';

import * as farmhash from 'farmhash-modern';

strictEqual(farmhash.fingerprint32('hello world'), 430397466);

strictEqual(
  farmhash.bigqueryFingerprint(
    'j4VzqT2cFawTN6Ke/BiklGM6ukh+WbKu5OzdXZVD/wYcju7f3PxD1BrD3jJ3ptjdca5b+uiAzyHg5UNiz80sTA==',
  ),
  -4106804224407357979n,
);

function jsBigQueryFingerprint(input) {
  const fingerprint = farmhash.fingerprint64(input);

  const unsigned = new BigUint64Array([fingerprint]);
  const signed = new BigInt64Array(unsigned.buffer);

  return signed[0];
}

const start = Date.now();
let testCount = 0;
while (Date.now() - start < 1_000) {
  testCount++;
  const input = randomBytes(128);
  strictEqual(
    farmhash.bigqueryFingerprint(input),
    jsBigQueryFingerprint(input),
  );
}
