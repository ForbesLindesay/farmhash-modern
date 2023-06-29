import React from 'react';
import './App.css';

import * as farmhash from 'farmhash-modern';

function FarmHashExample({
  name,
  children,
  hashFn,
}: {
  name: string;
  children?: React.ReactNode;
  hashFn: (input: string) => {toString(): string};
}) {
  const [input, setInput] = React.useState('');

  return (
    <div>
      <h2>{name}</h2>
      <div style={{display: 'flex'}}>
        <label style={{flexGrow: 1}}>
          <div>Input</div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        {children}
        <div style={{width: 20}} />
        <label style={{flexGrow: 1}}>
          <div>Output</div>
          <input type="text" value={hashFn(input).toString()} readOnly />
        </label>
      </div>
    </div>
  );
}

function FarmHashSeedExample({
  name,
  hashFn,
}: {
  name: string;
  hashFn: (input: string, seed: string) => {toString(): string};
}) {
  const [seed, setSeed] = React.useState('0');
  return (
    <FarmHashExample name={name} hashFn={(input) => hashFn(input, seed)}>
      <div style={{width: 20}} />
      <label style={{flexGrow: 1}}>
        <div>Seed</div>
        <input
          type="text"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
        />
      </label>
    </FarmHashExample>
  );
}
function App() {
  return (
    <div className="App">
      <div style={{flexGrow: 1}} />
      <main>
        <FarmHashExample
          name="bigqueryFingerprint"
          hashFn={farmhash.bigqueryFingerprint}
        />
        <FarmHashExample name="fingerprint32" hashFn={farmhash.fingerprint32} />
        <FarmHashExample name="fingerprint64" hashFn={farmhash.fingerprint64} />
        <FarmHashExample name="hash32" hashFn={farmhash.hash32} />
        <FarmHashExample name="hash64" hashFn={farmhash.hash64} />
        <FarmHashSeedExample
          name="hash32WithSeed"
          hashFn={(input, seed) =>
            farmhash.hash32WithSeed(input, parseInt(seed, 10))
          }
        />
        <FarmHashSeedExample
          name="hash64WithSeed"
          hashFn={(input, seed) => farmhash.hash64WithSeed(input, BigInt(seed))}
        />
      </main>
      <div style={{flexGrow: 1}} />
    </div>
  );
}

export default App;
