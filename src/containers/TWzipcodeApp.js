import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import County from '../components/County';
import District from '../components/District';
import ZipCode from '../components/ZipCode';
import Data from '../components/Data';
import * as twzipcodeActions from '../actions/twzipcodeActions';

class TWzipcodeApp extends Component {
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

  componentDidMount() {
    let county, counties, district, districts = [], zipcode;

    counties = Object.keys(Data);

    if (this.props.countySel === '') {
      county = counties[0];
    } else {
      county = this.props.countySel;
    }

    for (let d in Data[county]) {
      if (Data[county].hasOwnProperty(d)) {
        districts.push(d);
      }
    }

    if (this.props.districtSel === '') {
      district = districts[0];
    } else {
      if (this.props.districtSel in districts) {
        district = this.props.districtSel;
      } else {
        district = districts[0];
      }
    }

    zipcode = Data[county][district];

    if (this.props.detect) {
      this.geoLocation();
    }

    this.props.dispatch(twzipcodeActions.getInitData(county, district, districts, zipcode));

    if (this.props.zipcodeSel !== '') {
      this.props.dispatch(twzipcodeActions.changeZipcode(this.props.zipcodeSel));
    }
  }

  geoLocation() {
    let geolocation = navigator.geolocation,
      options = {
        'maximumAge': 600000,
        'timeout': 10000,
        'enableHighAccuracy': false
      };

    if (!geolocation) {
      return;
    }

    let serializeObject = (obj) => {
      let pairs = [];
      for (let prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
          continue;
        }
        pairs.push(prop + '=' + obj[prop]);
      }
      return pairs.join('&');
    };

    geolocation.getCurrentPosition(
      (loc) => {
        let latlng = {},
          googleGeocodeApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

        if (('coords' in loc) &&
          ('latitude' in loc.coords) &&
          ('longitude' in loc.coords)
        ) {
          latlng = [loc.coords.latitude, loc.coords.longitude];
          let xmlhttp = new XMLHttpRequest(),
            sendData = {
              'sensor': false,
              'latlng': latlng.join(','),
              'key': this.props.googleMapsKey
            };

          if (sendData) {
            googleGeocodeApiUrl += '?' + serializeObject(sendData);
          }

          xmlhttp.open('GET', googleGeocodeApiUrl, true);
          xmlhttp.send(null);

          xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
              var data = JSON.parse(xmlhttp.responseText);

              var postal = '';

              if (data &&
                data.hasOwnProperty('results') &&
                data.results[0].hasOwnProperty('address_components') &&
                undefined !== data.results[0].address_components[0]
              ) {
                postal = data.results[0]
                  .address_components[data.results[0].address_components.length - 1]
                  .long_name;
                if (postal) {
                  this.props.dispatch(twzipcodeActions.changeZipcode(postal));
                }
              }
            }
          };
        }
      },
      () => {
        // error
      },
      options
    );
  }

  render() {
    const { dispatch, twzipcodeData } = this.props;
    const actions = bindActionCreators(twzipcodeActions, dispatch);

    return (
      <div>
        <County ref="county" name={this.props.countyName}
                             className={this.props.css[0]}
                             data={twzipcodeData.counties}
                             defaultValue={twzipcodeData.county}
                             handleChangeCounty={this.props.handleChangeCounty}
                             actions={actions} />
        <District ref="district" name={this.props.districtName}
                                 className={this.props.css[1]}
                                 data={twzipcodeData.districts}
                                 defaultValue={twzipcodeData.district}
                                 handleChangeDistrict={this.props.handleChangeDistrict}
                                 actions={actions} />
        <ZipCode ref="zipcode" zipcodeSel={this.props.zipcodeSel}
                               name={this.props.zipcodeName}
                               className={this.props.css[2]}
                               data={twzipcodeData.zipcode}
                               handleChangeZipcode={this.props.handleChangeZipcode}
                               actions={actions} />
      </div>
    );
  }
}

function select(state) {
  return {
    twzipcodeData: state.twzipcodeData
  }
}

export default connect(select)(TWzipcodeApp);
