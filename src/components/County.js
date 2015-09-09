import React, { Component, PropTypes, findDOMNode } from 'react';

class County extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    actions: PropTypes.object,
    changeCounty: PropTypes.func,
    className: PropTypes.string,
    data: PropTypes.array,
    defaultValue: PropTypes.string,
    handleChangeCounty: PropTypes.func,
    name: PropTypes.string
  }

  onChange() {
    let currentCounty = findDOMNode(this).value;
    this.props.actions.changeCounty(currentCounty);

    this.props.handleChangeCounty.call(this);
  }

  render() {
    let counties = this.props.data.map((value, key) => {
      return (
        <option key={key} value={value}>{value}</option>
      );
    });

    return (
      <select name={this.props.name}
              className={this.props.className}
              onChange={::this.onChange}
              value={this.props.defaultValue}>
        {counties}
      </select>
    );
  }
}

export default County;
