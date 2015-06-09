React-TWzipcode
----

Rewrite [jQuery-TWzipcode](https://github.com/essoduke/jQuery-TWzipcode) in React.js.



## Demo

http://patw0929.github.io/React-TWzipcode/build/

## Install

```
npm install --save react-twzipcode
```

## Usage

```jsx
'use strict';

var React = require('react'),
  TWzipcode = require('react-twzipcode');

React.render(<TWzipcode css={['county-sel', 'district-sel', 'zipcode']} />, document.querySelector('.main'));
```

## Development

### Install npm packages

```
npm install
```

### Development Server

```
npm run dev-server
```

### Compile

```
webpack
```

## License

MIT

## Inspired by

[jQuery-TWzipcode](https://github.com/essoduke/jQuery-TWzipcode)
