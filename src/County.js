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
    var counties = this.props.data.map((value, key) => {
      return (
        <option key={key} value={value}>{value}</option>
      );
    });

    return (
      <select name={this.props.name} className={this.props.className} onChange={this.onChange} value={this.props.defaultValue}>
        {counties}
      </select>
    );
  }
});
