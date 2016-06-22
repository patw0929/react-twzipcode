import React, { Component, PropTypes } from 'react';
import County from './components/County';
import District from './components/District';
import ZipCode from './components/ZipCode';
import Data from './components/Data';
import { serializeObject } from './utils';

export default class TWzipcodeApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      county: '',
      counties: Object.keys(Data),
      district: '',
      districts: [],
      zipcode: '',
      zipcodePlaceholder: '',
    };

    this.changeCounty = this.changeCounty.bind(this);
    this.changeDistrict = this.changeDistrict.bind(this);
    this.changeZipcode = this.changeZipcode.bind(this);
  }

  static propTypes = {
    countyFieldName: PropTypes.string,
    countyValue: PropTypes.string,
    css: PropTypes.array,
    detect: PropTypes.bool,
    districtFieldName: PropTypes.string,
    districtValue: PropTypes.string,
    googleMapsKey: PropTypes.string,
    handleChangeCounty: PropTypes.func,
    handleChangeDistrict: PropTypes.func,
    handleChangeZipcode: PropTypes.func,
    zipcodeFieldName: PropTypes.string,
    zipcodeValue: PropTypes.string,
    zipcodePlaceholder: PropTypes.string,
  };

  static defaultProps = {
    countyName: 'county',
    countyValue: '',
    css: ['county-sel', 'district-sel', 'zipcode'],
    detect: false,
    districtName: 'district',
    districtValue: '',
    zipcodeName: 'zipcode',
    zipcodeValue: '',
    googleMapsKey: '',
  };

  componentWillMount() {
    let county;
    const counties = Object.keys(Data);
    let district;
    const districts = [];
    let zipcode = '';

    if (this.props.countyValue === '') {
      county = counties[0];
    } else {
      county = this.props.countyValue;
    }

    for (const d in Data[county]) {
      if ({}.hasOwnProperty.call(Data[county], d)) {
        districts.push(d);
      }
    }

    if (this.props.districtValue === '') {
      district = districts[0];
    } else {
      if (districts.indexOf(this.props.districtValue) > -1) {
        district = this.props.districtValue;
      } else {
        district = districts[0];
      }
    }

    zipcode = Data[county][district];

    this.setState({
      county,
      counties,
      district,
      districts,
      zipcode,
    });

    if (this.props.detect) {
      this.geoLocation();
    }

    if (this.props.zipcodeValue !== '') {
      this.changeZipcode.call(this, this.props.zipcodeValue);
    }
  }

  changeCounty(value) {
    const districts = [];
    for (const district in Data[value]) {
      if ({}.hasOwnProperty.call(Data[value], district)) {
        districts.push(district);
      }
    }

    this.setState({
      county: value,
      district: districts[0],
      zipcode: Data[value][districts[0]],
      districts,
    }, () => {
      if (typeof this.props.handleChangeCounty === 'function') {
        this.props.handleChangeCounty(this.state);
      }
    });
  }

  changeDistrict(value) {
    const zipcode = Data[this.state.county][[value][0]];

    this.setState({
      district: value,
      zipcode,
    }, () => {
      if (typeof this.props.handleChangeDistrict === 'function') {
        this.props.handleChangeDistrict(this.state);
      }
    });
  }

  changeZipcode(value) {
    let county = '';
    let district = '';

    if (value.length === 3) {
      for (const i in Data) {
        if ({}.hasOwnProperty.call(Data, i)) {
          for (const j in Data[i]) {
            if ({}.hasOwnProperty.call(Data[i], j)) {
              if (value === Data[i][j]) {
                county = i;
                district = j;
                break;
              }
            }
          }
        }
      }

      if (county && district && value) {
        this.setState({
          districts: Object.keys(Data[county]),
          zipcode: value,
          county,
          district,
        }, () => {
          if (typeof this.props.handleChangeZipcode === 'function') {
            this.props.handleChangeZipcode(this.state);
          }
        });
      }
    } else {
      this.setState({
        zipcode: value,
      });
    }
  }

  geoLocation() {
    const geolocation = window.navigator.geolocation;
    const options = {
      maximumAge: 600000,
      timeout: 10000,
      enableHighAccuracy: false,
    };

    if (!geolocation) {
      return;
    }

    geolocation.getCurrentPosition(({ coords }) => {
      let latlng = [];
      let googleGeocodeApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

      if (coords && coords.latitude && coords.longitude) {
        latlng = [coords.latitude, coords.longitude];
        const xmlhttp = new XMLHttpRequest();
        const sendData = {
          sensor: false,
          latlng: latlng.join(','),
          key: this.props.googleMapsKey,
        };

        if (sendData) {
          googleGeocodeApiUrl += `?${serializeObject(sendData)}`;
        }

        xmlhttp.open('GET', googleGeocodeApiUrl, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            const data = JSON.parse(xmlhttp.responseText);
            let postal = '';

            if (data &&
              {}.hasOwnProperty.call(data, 'results') &&
              {}.hasOwnProperty.call(data.results[0], 'address_components') &&
              undefined !== data.results[0].address_components[0]
            ) {
              postal = data.results[0]
                .address_components[data.results[0].address_components.length - 1]
                .long_name;

              if (postal) {
                this.changeZipcode.call(this, postal);
              }
            }
          }
        };
      }
    }, null, options);
  }

  render() {
    return (
      <div>
        <County fieldName={this.props.countyFieldName}
          className={this.props.css[0]}
          data={this.state.counties}
          value={this.state.county}
          changeCounty={this.changeCounty}
        />
        <District fieldName={this.props.districtFieldName}
          className={this.props.css[1]}
          data={this.state.districts}
          value={this.state.district}
          changeDistrict={this.changeDistrict}
        />
        <ZipCode
          name={this.props.zipcodeFieldName}
          className={this.props.css[2]}
          value={this.state.zipcode}
          placeholder={this.props.zipcodePlaceholder}
          changeZipcode={this.changeZipcode}
        />
      </div>
    );
  }
}
