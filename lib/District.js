'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = _react2['default'].createClass({
  displayName: 'District',

  onChange: function onChange() {
    var currentDistrict = this.getDOMNode().value;
    this.props.changeDistrict(currentDistrict);
  },
  render: function render() {
    var self = this;
    var districts = this.props.data.map(function (value) {
      return _react2['default'].createElement(
        'option',
        { value: value, selected: self.props.defaultValue === value },
        value
      );
    });

    return _react2['default'].createElement(
      'select',
      { name: this.props.name, className: this.props.className, onChange: this.onChange, defaultValue: this.props.defaultValue },
      districts
    );
  }
});
module.exports = exports['default'];