import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import County from './County';
import District from './District';
import ZipCode from './ZipCode';
import zipData from '../utils/zipData';
import { serializeObject, findDeep } from '../utils/utils';

export default class TWzipcodeApp extends PureComponent {
  static state = {
    county: '',
    counties: Object.keys(zipData),
    district: '',
    districts: [],
    zipcode: '',
    zipcodePlaceholder: '',
  };

  static propTypes = {
    countyFieldName: PropTypes.string,
    countyValue: PropTypes.string,
    css: PropTypes.arrayOf(PropTypes.string),
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
    countyFieldName: 'county',
    countyValue: '',
    css: ['county-sel', 'district-sel', 'zipcode'],
    detect: false,
    districtFieldName: 'district',
    districtValue: '',
    googleMapsKey: '',
    handleChangeCounty: undefined,
    handleChangeDistrict: undefined,
    handleChangeZipcode: undefined,
    zipcodeFieldName: 'zipcode',
    zipcodeValue: '',
    zipcodePlaceholder: '',
  };

  componentWillMount() {
    const counties = Object.keys(zipData);
    const {
      countyValue,
      districtValue,
      detect,
      zipcodeValue,
    } = this.props;
    const county = (countyValue === '') ? counties[0] : countyValue;
    let district;
    let zipcode = '';

    const districts = Object.keys(zipData[county]).map((d) => d, []);

    if (districtValue === '') {
      district = districts[0];
    } else if (districts.indexOf(districtValue) > -1) {
      district = districtValue;
    } else {
      district = districts[0];
    }

    zipcode = zipData[county][district];

    this.setState({
      county,
      counties,
      district,
      districts,
      zipcode,
    });

    if (detect) {
      this.geoLocation();
    }

    if (zipcodeValue !== '') {
      this.changeZipcode.call(this, zipcodeValue);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.countyValue && nextProps.countyValue !== this.props.countyValue) {
      this.changeCounty.call(this, nextProps.countyValue);
    }

    if (nextProps.districtValue && nextProps.districtValue !== this.props.districtValue) {
      this.changeDistrict.call(this, nextProps.districtValue);
    }

    if (nextProps.zipcodeValue && nextProps.zipcodeValue !== this.props.zipcodeValue) {
      this.changeZipcode.call(this, nextProps.zipcodeValue);
    }
  }

  changeCounty = (county) => {
    const districts = Object.keys(zipData[county]).map((d) => d, []);
    const { handleChangeCounty } = this.props;

    this.setState({
      county,
      district: districts[0],
      zipcode: zipData[county][districts[0]],
      districts,
    }, () => {
      if (typeof handleChangeCounty === 'function') {
        handleChangeCounty({
          county: this.state.county,
          district: this.state.district,
          zipcode: this.state.zipcode,
        });
      }
    });
  };

  changeDistrict = (district) => {
    const zipcode = zipData[this.state.county][[district][0]];
    const { handleChangeDistrict } = this.props;

    this.setState({
      district,
      zipcode,
    }, () => {
      if (typeof handleChangeDistrict === 'function') {
        handleChangeDistrict({
          county: this.state.county,
          district: this.state.district,
          zipcode: this.state.zipcode,
        });
      }
    });
  };

  changeZipcode = (zipcode) => {
    if (zipcode && zipcode.length === 3) {
      const { county, district } = findDeep(zipData, zipcode);
      const { handleChangeZipcode } = this.props;

      if (county && district && zipcode) {
        this.setState({
          districts: Object.keys(zipData[county]),
          county,
          district,
          zipcode,
        }, () => {
          if (typeof handleChangeZipcode === 'function') {
            handleChangeZipcode({
              county: this.state.county,
              district: this.state.district,
              zipcode: this.state.zipcode,
            });
          }
        });
      }
    } else {
      this.setState({
        zipcode,
      });
    }
  };

  geoLocation = () => {
    const geolocation = window && window.navigator && window.navigator.geolocation;
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
  };

  render() {
    const {
      countyFieldName,
      districtFieldName,
      zipcodeFieldName,
      zipcodePlaceholder,
      css,
    } = this.props;
    const {
      counties,
      county,
      districts,
      district,
      zipcode,
    } = this.state;

    return (
      <div>
        <County
          fieldName={ countyFieldName }
          className={ css[0] }
          data={ counties }
          value={ county }
          changeCounty={ this.changeCounty }
        />
        <District
          fieldName={ districtFieldName }
          className={ css[1] }
          data={ districts }
          value={ district }
          changeDistrict={ this.changeDistrict }
        />
        <ZipCode
          fieldName={ zipcodeFieldName }
          className={ css[2] }
          value={ zipcode }
          placeholder={ zipcodePlaceholder }
          changeZipcode={ this.changeZipcode }
        />
      </div>
    );
  }
}
