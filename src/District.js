'use strict';

import React from 'react';

export default React.createClass({
  propTypes: {
    changeDistrict: React.PropTypes.func,
    className: React.PropTypes.string,
    data: React.PropTypes.object,
    defaultValue: React.PropTypes.string,
    name: React.PropTypes.string
  },
  onChange () {
    var currentDistrict = this.getDOMNode().value;
    this.props.changeDistrict(currentDistrict);
  },
  render () {
    var districts = this.props.data.map((value) => {
      return (
        <option value={value} selected={this.props.defaultValue === value}>{value}</option>
      );
    });

    return (
      <select name={this.props.name} className={this.props.className} onChange={this.onChange} defaultValue={this.props.defaultValue}>
        {districts}
      </select>
    );
  }
});
