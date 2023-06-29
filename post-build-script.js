const {readFileSync, writeFileSync, readdirSync, unlinkSync} = require('fs');

const src = readFileSync(`lib/index.js`, `utf8`);
const typesSrc = readFileSync(`lib/index.d.ts`, `utf8`);

const importStatement = `import * as farmhash from '../bin/nodejs/farmhash_modern.js';`;
writeFileSync(`lib/index.mjs`, src);
writeFileSync(`lib/index.d.mts`, typesSrc);
writeFileSync(
  `lib/index.cjs`,
  src
    .split(importStatement)
    .join(`const farmhash = require('../bin/nodejs/farmhash_modern.js')`)
    .replace(/export function ([a-zA-Z0-9_]+)/g, `exports.$1 = function $1`),
);
writeFileSync(`lib/index.d.cts`, typesSrc);
writeFileSync(
  `lib/browser.js`,
  src
    .split(importStatement)
    .join(`import * as farmhash from '../bin/bundler/farmhash_modern.js';`),
);
writeFileSync(`lib/browser.d.ts`, typesSrc);

for (const target of [`bundler`, `nodejs`]) {
  for (const filename of readdirSync(`bin/${target}`)) {
    if (!filename.endsWith(`.wasm`) && !filename.endsWith(`.js`)) {
      unlinkSync(`bin/${target}/${filename}`);
    }
  }
}
