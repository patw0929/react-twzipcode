import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class District extends PureComponent {
  static propTypes = {
    changeDistrict: PropTypes.func,
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    fieldName: PropTypes.string,
  };

  onChange = (e) => {
    const currentDistrict = e.target.value;

    this.props.changeDistrict(currentDistrict);
  };

  render() {
    const {
      data,
      fieldName,
      className,
      value,
    } = this.props;

    const districts = data.map((v) =>
      <option key={ v } value={ v }>{v}</option>);

    return (
      <select
        name={ fieldName }
        className={ className }
        onChange={ this.onChange }
        value={ value }
      >
        {districts}
      </select>
    );
  }
}
