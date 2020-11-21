const babel = require('@babel/core');
const plugin = require('./index.js');

const code = `
import { useState } from 'react';

export const displayName = 'MyComponent';
export let firstName = 'Marcel';
export let lastName = 'Miranda';
export let node = <p>something</p>

const x = useState(0);

<>
  <h1>Hello world</h1>
</>
`;

const output = babel.transformSync(code, {
  plugins: [plugin],
});

console.log(output.code); 