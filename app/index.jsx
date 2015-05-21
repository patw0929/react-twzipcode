'use strict';

var React = require('react');
var TWzipcode = require('./main');

React.render(<TWzipcode css={['form-control county-sel', 'form-control district-sel', 'form-control zipcode']} />, document.querySelector('.main'));
