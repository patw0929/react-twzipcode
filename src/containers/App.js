import React, { Component, PropTypes } from 'react';
import TWzipcodeApp from './TWzipcodeApp';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';

let state = {};
const reducer = combineReducers(reducers);
const store = createStore(reducer);

class App extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    countyName: PropTypes.string,
    countySel: PropTypes.string,
    css: PropTypes.array,
    detect: PropTypes.bool,
    districtName: PropTypes.string,
    districtSel: PropTypes.string,
    googleMapsKey: PropTypes.string,
    handleChangeCounty: PropTypes.func,
    handleChangeDistrict: PropTypes.func,
    handleChangeZipcode: PropTypes.func,
    zipcodeName: PropTypes.string,
    zipcodeSel: PropTypes.string
  }

  static defaultProps = {
    countyName: 'county',
    countySel: '',
    css: ['county-sel', 'district-sel', 'zipcode'],
    detect: false,
    districtName: 'district',
    districtSel: '',
    zipcodeName: 'zipcode',
    zipcodeSel: '',
    googleMapsKey: ''
  }

  handleChangeCounty() {
    if (typeof this.props.handleChangeCounty === 'function') {
      this.props.handleChangeCounty(state);
    }
  }

  handleChangeDistrict() {
    if (typeof this.props.handleChangeDistrict === 'function') {
      this.props.handleChangeDistrict(state);
    }
  }

  handleChangeZipcode() {
    if (typeof this.props.handleChangeZipcode === 'function') {
      this.props.handleChangeZipcode(state);
    }
  }

  render() {
    return (
      <Provider store={store}>
        {() => <TWzipcodeApp countyName={this.props.countyName}
                             countySel={this.props.countySel}
                             css={this.props.css}
                             detect={this.props.detect}
                             districtName={this.props.districtName}
                             districtSel={this.props.districtSel}
                             googleMapsKey={this.props.googleMapsKey}
                             handleChangeCounty={this.handleChangeCounty.bind(this)}
                             handleChangeDistrict={this.handleChangeDistrict.bind(this)}
                             handleChangeZipcode={this.handleChangeZipcode.bind(this)}
                             zipcodeName={this.props.zipcodeName}
                             zipcodeSel={this.props.zipcodeSel} />}
      </Provider>
    );
  }
}

store.subscribe(() => {
  let { county: county, district: district, zipcode: zipcode } = store.getState().twzipcodeData;
  state = { county: county, district: district, zipcode: zipcode };
});

export default App;
