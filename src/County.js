'use strict';

import React from 'react';

export default React.createClass({
  propTypes: {
    changeCounty: React.PropTypes.func,
    className: React.PropTypes.string,
    data: React.PropTypes.array,
    defaultValue: React.PropTypes.string,
    name: React.PropTypes.string
  },
  onChange () {
    var currentCounty = this.getDOMNode().value;
    this.props.changeCounty(currentCounty);
  },
  render () {
    var counties = this.props.data.map((value) => {
      return (
        <option value={value} selected={this.props.defaultValue === value}>{value}</option>
      );
    });

    return (
      <select name={this.props.name} className={this.props.className} onChange={this.onChange} defaultValue={this.props.defaultValue}>
        {counties}
      </select>
    );
  }
});
