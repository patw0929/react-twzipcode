import React, { Component, PropTypes } from 'react';

export default class County extends Component {
  static propTypes = {
    changeCounty: PropTypes.func,
    className: PropTypes.string,
    data: PropTypes.array,
    value: PropTypes.string,
    fieldName: PropTypes.string
  };

  onChange(e) {
    const currentCounty = e.target.value;
    this.props.changeCounty(currentCounty);
  }

  render() {
    const counties = this.props.data.map((value, key) =>
      <option key={key} value={value}>{value}</option>);

    return (
      <select name={this.props.fieldName}
        className={this.props.className}
        onChange={this.onChange.bind(this)}
        value={this.props.value}>
        {counties}
      </select>
    );
  }
}
