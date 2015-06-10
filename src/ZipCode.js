'use strict';

import React from 'react';
import Data from './Data';

export default React.createClass({
  onChange () {
    var zipCode = this.getDOMNode().value,
      i, j;

    if (zipCode.length === 3) {
      for (i in Data) {
        if (Data.hasOwnProperty(i)) {
          for (j in Data[i]) {
            if (Data[i].hasOwnProperty(j)) {
              if (zipCode === Data[i][j]) {
                this.props.changeZipcode(zipCode);
                break;
              }
            }
          }
        }
      }
    }
  },
  componentDidUpdate () {
    this.getDOMNode().value = this.props.data;
  },
  render () {
    return (
      <input type="text" className={this.props.className}
                         name={this.props.name}
                         onChange={this.onChange} />
    );
  }
});
