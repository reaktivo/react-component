# react-component

`react-component` allows you to write terse single-file React components, à la Svelte & Vue.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/reaktivo/react-component/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@reaktivo/react-component.svg?style=flat)](https://www.npmjs.com/package/react-component)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/reaktivo/react-component/compare)

## Installation

    $ npm install @reaktivo/react-component
    $ yarn add @reaktivo/react-component

## Usage

`react-component` takes a single-file component definition and converts it into a regular component definition.

```jsx
// App.component.js
import Page from './Page';

export let children;
export let title = '';

<Page>
  <h1>{title}</h1>
  {children}
</Page>
```

The previous is converted to:

```jsx
import Page from './Page';

export default function App({ title = '', children }) {
  return (
    <Page>
      <h1>{title}</h1>
      {children}
    </Page>
  )
}
```

### Props

As you can see on the previous example, component props are defined by the `export let` keywords, where the right hand side of the assignment becomes the default value of the prop.

### Component name

A component's [`displayName`](https://reactjs.org/docs/react-component.html#displayname) will by default be parsed out of a component's file name. If you need to define a different one you can:

```jsx
export const displayName = 'ComponentName';

<h1>Hello</h1>
```

is converted to:

```jsx
export const displayName = 'ComponentName';

export default function ComponentName() {
  return (
    <h1>Hello</h1>
  );
}
```

## Configuration

### Next.js
```
// next.config.js
const withReactComponent = require('@reaktivo/react-component/next');

module.exports = withReactComponent({
  extension: /\.react\./
});
```

### Webpack

```
// ...
module: {
  rules: [
    // ...
    {
      test: /\.react\./,
      use: ['babel-loader', '@reaktivo/react-component/loader']
    }
  ]
}
```

## License

react-component is open source software [licensed as MIT](https://github.com/reaktivo/react-component/blob/master/LICENSE).
