import React, { Component, PropTypes } from 'react';
import Data from './Data';

export default class ZipCode extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  static propTypes = {
    changeZipcode: PropTypes.func,
    className: PropTypes.string,
    value: PropTypes.string,
    fieldName: PropTypes.string,
    placeholder: PropTypes.string,
  };

  onChange(e) {
    const zipCode = e.target.value;
    let i;
    let j;

    this.props.changeZipcode(zipCode);

    if (zipCode.length === 3) {
      for (i in Data) {
        if ({}.hasOwnProperty.call(Data, i)) {
          for (j in Data[i]) {
            if ({}.hasOwnProperty.call(Data[i], j)) {
              if (zipCode === Data[i][j]) {
                this.props.changeZipcode(zipCode);
                break;
              }
            }
          }
        }
      }
    }
  }

  render() {
    return (
      <input type="text" className={this.props.className}
        name={this.props.fieldName}
        value={this.props.value}
        onChange={this.onChange}
        placeholder={this.props.placeholder}
        maxLength="3"
      />
    );
  }
}
