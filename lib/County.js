'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = _react2['default'].createClass({
  displayName: 'County',

  propTypes: {
    changeCounty: _react2['default'].PropTypes.func,
    className: _react2['default'].PropTypes.string,
    data: _react2['default'].PropTypes.array,
    defaultValue: _react2['default'].PropTypes.string,
    name: _react2['default'].PropTypes.string
  },
  onChange: function onChange() {
    var currentCounty = this.getDOMNode().value;
    this.props.changeCounty(currentCounty);
  },
  render: function render() {
    var counties = this.props.data.map(function (value, key) {
      return _react2['default'].createElement(
        'option',
        { key: key, value: value },
        value
      );
    });

    return _react2['default'].createElement(
      'select',
      { name: this.props.name, className: this.props.className, onChange: this.onChange, value: this.props.defaultValue },
      counties
    );
  }
});
module.exports = exports['default'];