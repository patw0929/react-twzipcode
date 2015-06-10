'use strict';

import React from 'react';

export default React.createClass({
  _onChange () {
    var currentDistrict = this.getDOMNode().value;
    this.props.changeDistrict(currentDistrict);
  },
  render () {
    var self = this;
    var districts = this.props.data.map(function (value) {
      return (
        <option value={value} selected={self.props.defaultValue === value}>{value}</option>
      );
    });

    return (
      <select name={this.props.name} className={this.props.className} onChange={this.onChange} defaultValue={this.props.defaultValue}>
        {districts}
      </select>
    );
  }
});
