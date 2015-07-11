'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Data = require('./Data');

var _Data2 = _interopRequireDefault(_Data);

exports['default'] = _react2['default'].createClass({
  displayName: 'ZipCode',

  propTypes: {
    changeZipcode: _react2['default'].PropTypes.func,
    className: _react2['default'].PropTypes.string,
    data: _react2['default'].PropTypes.object,
    name: _react2['default'].PropTypes.string
  },
  onChange: function onChange() {
    var zipCode = this.getDOMNode().value,
        i,
        j;

    if (zipCode.length === 3) {
      for (i in _Data2['default']) {
        if (_Data2['default'].hasOwnProperty(i)) {
          for (j in _Data2['default'][i]) {
            if (_Data2['default'][i].hasOwnProperty(j)) {
              if (zipCode === _Data2['default'][i][j]) {
                this.props.changeZipcode(zipCode);
                break;
              }
            }
          }
        }
      }
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    this.getDOMNode().value = this.props.data;
  },
  render: function render() {
    return _react2['default'].createElement('input', { type: 'text', className: this.props.className,
      name: this.props.name,
      onChange: this.onChange });
  }
});
module.exports = exports['default'];