'use strict';

import React from 'react';
import Data from './Data';
import County from './County';
import District from './District';
import ZipCode from './ZipCode';

export default React.createClass({
  getInitialState () {
    return {
      county: '',
      counties: Object.keys(Data),
      district: '',
      districts: [],
      zipcode: ''
    };
  },
  getDefaultProps () {
    return {
      countyName: 'county',
      countySel: '',
      css: ['county-sel', 'district-sel', 'zipcode'],
      detect: false,
      districtName: 'district',
      districtSel: '',
      zipcodeName: 'zipcode',
      zipcodeSel: ''
    };
  },
  geoLocation () {
    var self = this,
      geolocation = navigator.geolocation,
      options = {
        'maximumAge': 600000,
        'timeout': 10000,
        'enableHighAccuracy': false
      };

    if (!geolocation) {
      return;
    }

    var serializeObject = function (obj) {
      var pairs = [];
      for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
          continue;
        }
        pairs.push(prop + '=' + obj[prop]);
      }
      return pairs.join('&');
    };

    geolocation.getCurrentPosition(
      function (loc) {
        var latlng = {},
          googleGeocodeApiUrl = 'http://maps.googleapis.com/maps/api/geocode/json';

        if (('coords' in loc) &&
          ('latitude' in loc.coords) &&
          ('longitude' in loc.coords)
        ) {
          latlng = [loc.coords.latitude, loc.coords.longitude];
          var xmlhttp = new XMLHttpRequest(),
            sendData = {
              'sensor': false,
              'latlng': latlng.join(',')
            };

          if (sendData) {
            googleGeocodeApiUrl += '?' + serializeObject(sendData);
          }

          xmlhttp.open('GET', googleGeocodeApiUrl, true);
          xmlhttp.send(null);

          xmlhttp.onreadystatechange = function () {
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
                  self.changeZipcode(postal);
                }
              }
            }
          };
        }
      },
      function () {
        // error
      },
      options
    );
  },
  componentDidMount () {
    var county, counties, district, districts = [], zipcode;

    counties = Object.keys(Data);

    if (this.props.countySel === '') {
      county = counties[0];
    } else {
      county = this.props.countySel;
    }

    for (var d in Data[county]) {
      districts.push(d);
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

    this.setState({
      county: county,
      counties: counties,
      district: district,
      districts: districts,
      zipcode: zipcode
    });

    if (this.props.zipcodeSel !== '') {
      this.changeZipcode(this.props.zipcodeSel);
    }
  },
  changeCounty (county) {
    var districts = [];
    for (var district in Data[county]) {
      districts.push(district);
    }

    this.setState({
      county: county,
      counties: this.state.counties,
      district: districts[0],
      districts: districts,
      zipcode: Data[county][districts[0]]
    }, function () {
      if (typeof this.props.handleChangeCounty === 'function') {
        this.props.handleChangeCounty(this.state);
      }
    });
  },
  changeDistrict (district) {
    var zipCode = Data[this.state.county][[district][0]];

    this.setState({
      county: this.state.county,
      counties: this.state.counties,
      district: district,
      districts: this.state.districts,
      zipcode: zipCode
    }, function () {
      if (typeof this.props.handleChangeDistrict === 'function') {
        this.props.handleChangeDistrict(this.state);
      }
    });
  },
  changeZipcode (zipcode) {
    var county = '',
      district = '';

    for (var i in Data) {
      if (Data.hasOwnProperty(i)) {
        for (var j in Data[i]) {
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
    }, function () {
      if (typeof this.props.handleChangeZipcode === 'function') {
        this.props.handleChangeZipcode(this.state);
      }
    });
  },
  render () {
    return (
      <div>
        <County ref="county" name={this.props.countyName} className={this.props.css[0]} data={this.state.counties} defaultValue={this.state.county} changeCounty={this.changeCounty} />
        <District ref="district" name={this.props.districtName} className={this.props.css[1]} data={this.state.districts} defaultValue={this.state.district} changeDistrict={this.changeDistrict} />
        <ZipCode ref="zipcode" zipcodeSel={this.props.zipcodeSel} name={this.props.zipcodeName} className={this.props.css[2]} data={this.state.zipcode} changeZipcode={this.changeZipcode} />
      </div>
    );
  }
});
