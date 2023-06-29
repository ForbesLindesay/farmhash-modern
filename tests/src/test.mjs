import {strictEqual} from 'assert';

import * as farmhash from 'farmhash-modern';

strictEqual(farmhash.fingerprint32('hello world'), 430397466);

strictEqual(
  farmhash.bigqueryFingerprint(
    'j4VzqT2cFawTN6Ke/BiklGM6ukh+WbKu5OzdXZVD/wYcju7f3PxD1BrD3jJ3ptjdca5b+uiAzyHg5UNiz80sTA==',
  ),
  -4106804224407357979n,
);
