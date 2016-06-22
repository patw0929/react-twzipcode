# React-TWzipcode

[![Build Status](https://travis-ci.org/patw0929/react-twzipcode.svg)](https://travis-ci.org/patw0929/react-twzipcode)
[![npm version](https://badge.fury.io/js/react-twzipcode.svg)](http://badge.fury.io/js/react-twzipcode)
[![Coverage Status](https://coveralls.io/repos/github/patw0929/react-twzipcode/badge.svg?branch=master)](https://coveralls.io/github/patw0929/react-twzipcode?branch=master)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)]()

Rewrite [jQuery-TWzipcode](https://github.com/essoduke/jQuery-TWzipcode) in React.js.


## Demo & Examples

Live demo: [patw0929.github.io/react-twzipcode](http://patw0929.github.io/react-twzipcode/)

To build the examples locally, run:

```
npm install
npm run example
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-twzipcode is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/main.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-twzipcode --save
```


## Usage

```javascript
import TWzipcode from 'react-twzipcode';

<TWzipcode css={['county-sel', 'district-sel', 'zipcode']} />
```

### Properties

Please see the [Demo Page](http://patw0929.github.io/react-twzipcode/)


## Development (`src` and the build process)

**NOTE:** The source code for the component is in `src`. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm run example`.


## Contributing

To contribute to react-twzipcode, clone this repo locally and commit your code on a separate branch. Please write tests for your code, and run the linter before opening a pull-request:

```bash
npm test
npm run lint
```


## License

MIT

Copyright (c) 2015-2016 [patw](https://patw.me).

