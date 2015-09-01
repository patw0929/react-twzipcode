import React, { Component, PropTypes } from 'react';
import Data from './Data';
import County from './County';
import District from './District';
import ZipCode from './ZipCode';

class TWzipcode extends Component {
   constructor() {
    super();
    this.state = {
      county: '',
      counties: Object.keys(Data),
      district: '',
      districts: [],
      zipcode: ''
    };

    this.geoLocation = this.geoLocation.bind(this);
    this.changeCounty = this.changeCounty.bind(this);
    this.changeDistrict = this.changeDistrict.bind(this);
    this.changeZipcode = this.changeZipcode.bind(this);
   }

  static propTypes = {
    changeDistrict: PropTypes.func,
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

    this.setInitialState(county, counties, district, districts, zipcode);

    if (this.props.zipcodeSel !== '') {
      this.changeZipcode(this.props.zipcodeSel);
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
                  this.changeZipcode(postal);
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

  setInitialState(county, counties, district, districts, zipcode) {
    this.setState({
      county: county,
      counties: counties,
      district: district,
      districts: districts,
      zipcode: zipcode
    });
  }

  changeCounty(county) {
    let districts = [];
    for (let district in Data[county]) {
      if (Data[county].hasOwnProperty(district)) {
        districts.push(district);
      }
    }

    this.setState({
      county: county,
      counties: this.state.counties,
      district: districts[0],
      districts: districts,
      zipcode: Data[county][districts[0]]
    }, () => {
      if (typeof this.props.handleChangeCounty === 'function') {
        this.props.handleChangeCounty(this.state);
      }
    });
  }

  changeDistrict(district) {
    let zipCode = Data[this.state.county][[district][0]];

    this.setState({
      county: this.state.county,
      counties: this.state.counties,
      district: district,
      districts: this.state.districts,
      zipcode: zipCode
    }, () => {
      if (typeof this.props.handleChangeDistrict === 'function') {
        this.props.handleChangeDistrict(this.state);
      }
    });
  }

  changeZipcode(zipcode) {
    let county = '',
      district = '';

    for (let i in Data) {
      if (Data.hasOwnProperty(i)) {
        for (let j in Data[i]) {
          if (Data[i].hasOwnProperty(j)) {
            if (zipcode === Data[i][j]) {
              county = i;
              district = j;
              break;
            }
          }
        }
      }
    }

    var counties = Object.keys(Data),
      districts = Object.keys(Data[county]);

    this.setState({
      county: county,
      counties: counties,
      district: district,
      districts: districts,
      zipcode: zipcode
    }, () => {
      if (typeof this.props.handleChangeZipcode === 'function') {
        this.props.handleChangeZipcode(this.state);
      }
    });
  }

  render() {
    return (
      <div>
        <County ref="county" name={this.props.countyName} className={this.props.css[0]} data={this.state.counties} defaultValue={this.state.county} changeCounty={this.changeCounty} />
        <District ref="district" name={this.props.districtName} className={this.props.css[1]} data={this.state.districts} defaultValue={this.state.district} changeDistrict={this.changeDistrict} />
        <ZipCode ref="zipcode" zipcodeSel={this.props.zipcodeSel} name={this.props.zipcodeName} className={this.props.css[2]} data={this.state.zipcode} changeZipcode={this.changeZipcode} />
      </div>
    );
  }
}

export default TWzipcode;
