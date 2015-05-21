React-TWzipcode
----

Rewrite [jQuery-TWzipcode](https://github.com/essoduke/jQuery-TWzipcode) in React.js.



## Demo

http://patw0929.github.io/React-TWzipcode/build/index.html

## Usage

```jsx
'use strict';

var React = require('react');
var TWzipcode = require('./app/main.jsx');

React.render(<TWzipcode css={['county-sel', 'district-sel', 'zipcode']} />, document.querySelector('.main'));
```

## License

MIT

## Inspired by

[jQuery-TWzipcode](https://github.com/essoduke/jQuery-TWzipcode)
