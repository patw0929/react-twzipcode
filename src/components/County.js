import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class County extends PureComponent {
  static propTypes = {
    changeCounty: PropTypes.func,
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    fieldName: PropTypes.string,
  };

  onChange = (e) => {
    this.props.changeCounty(e.target.value);
  };

  render() {
    const {
      data,
      fieldName,
      className,
      value,
    } = this.props;

    const counties = data.map((v) =>
      <option key={ v } value={ v }>{v}</option>);

    return (
      <select
        name={ fieldName }
        className={ className }
        onChange={ this.onChange }
        value={ value }
      >
        {counties}
      </select>
    );
  }
}
