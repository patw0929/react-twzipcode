import React, { Component, PropTypes } from 'react';

export default class District extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  static propTypes = {
    changeDistrict: PropTypes.func,
    className: PropTypes.string,
    data: PropTypes.array,
    value: PropTypes.string,
    fieldName: PropTypes.string,
  };

  onChange(e) {
    const currentDistrict = e.target.value;
    this.props.changeDistrict(currentDistrict);
  }

  render() {
    const districts = this.props.data.map((value, key) =>
      <option key={key} value={value}>{value}</option>);

    return (
      <select name={this.props.fieldName}
        className={this.props.className}
        onChange={this.onChange}
        value={this.props.value}
      >
        {districts}
      </select>
    );
  }
}
