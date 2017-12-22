# React-TWzipcode

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Build Status](https://travis-ci.org/patw0929/react-twzipcode.svg)](https://travis-ci.org/patw0929/react-twzipcode)
[![npm version](https://badge.fury.io/js/react-twzipcode.svg)](http://badge.fury.io/js/react-twzipcode)
[![Coverage Status](https://coveralls.io/repos/github/patw0929/react-twzipcode/badge.svg?branch=master)](https://coveralls.io/github/patw0929/react-twzipcode?branch=master)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)]()

Rewrite [jQuery-TWzipcode](https://github.com/essoduke/jQuery-TWzipcode) in React.js.


## Demo & Examples

Live demo: [patw0929.github.io/react-twzipcode](http://patw0929.github.io/react-twzipcode/)

To build the examples locally, run:

```bash
npm install
npm run start
```

or

```bash
yarn
yarn start
```

Then open [`localhost:3000`](http://localhost:3000) in a browser.


## Installation

The easiest way to use react-twzipcode is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/main.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```bash
npm install react-twzipcode --save
```

or

```bash
yarn add react-twzipcode
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

To build, watch and serve the examples (which will also watch the component source), run `npm start` or `yarn start`.

If you want to build to the bundle file to `dist/` folder, please run:

```bash
npm run build
```

or

```bash
yarn run build
```

## Contributing

To contribute to react-twzipcode, clone this repo locally and commit your code on a separate branch. Please write tests for your code, and run the linter before opening a pull-request:

```bash
npm test
npm run lint
```

or

```bash
yarn test
yarn run lint
```

And please remember **don't** bumping version in pull request commits.

## License

MIT

Copyright (c) 2015-2017 [patw](https://patw.me).
