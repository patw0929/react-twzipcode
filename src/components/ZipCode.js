import React, { Component, PropTypes, findDOMNode } from 'react';
import Data from './Data';

class ZipCode extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    actions: PropTypes.object,
    changeZipcode: PropTypes.func,
    className: PropTypes.string,
    data: PropTypes.string,
    handleChangeZipcode: PropTypes.func,
    name: PropTypes.string
  }

  componentDidUpdate() {
    findDOMNode(this).value = this.props.data;
  }

  onChange() {
    let zipCode = findDOMNode(this).value,
      i, j;

    if (zipCode.length === 3) {
      for (i in Data) {
        if (Data.hasOwnProperty(i)) {
          for (j in Data[i]) {
            if (Data[i].hasOwnProperty(j)) {
              if (zipCode === Data[i][j]) {
                this.props.actions.changeZipcode(zipCode);
                break;
              }
            }
          }
        }
      }
    }

    this.props.handleChangeZipcode.call(this);
  }

  render() {
    return (
      <input type="text" className={this.props.className}
                         name={this.props.name}
                         onChange={::this.onChange} />
    );
  }
}

export default ZipCode;
