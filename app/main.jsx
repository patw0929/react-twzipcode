'use strict';

var React = require('react');
var data = require('./data.json');

var TWzipcode = React.createClass({
  getInitialState: function () {
    return {
      county: '',
      counties: Object.keys(data),
      district: '',
      districts: [],
      zipcode: ''
    };
  },
  getDefaultProps: function () {
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
  geoLocation: function () {
    var self = this,
      geolocation = navigator.geolocation,
      options = {
        'maximumAge': 600000,
        'timeout': 10000,
        'enableHighAccuracy': false
      },
      opts = self.options;

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
    }

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
              //'key': opts.googleMapsKey,
              'sensor': false,
              'latlng': latlng.join(',')
            };

          if (sendData) {
            googleGeocodeApiUrl += '?' + serializeObject(sendData);
          }

          xmlhttp.open('GET', googleGeocodeApiUrl, true);
          xmlhttp.send(null);

          xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              var data = JSON.parse(xmlhttp.responseText);
              console.log(data);

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
      function (error) {
        // console.error(error);
      },
      options
    );
  },
  componentDidMount: function () {
    var county, counties, district, districts, zipcode;

    counties = Object.keys(data);

    if (this.props.countySel === '') {
      county = counties[0];
    } else {
      county = this.props.countySel;
    }

    var districts = [];
    for (var district in data[county]) {
      districts.push(district);
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

    zipcode = data[county][district];

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
  changeCounty: function (county) {
    var districts = [];
    for (var district in data[county]) {
      districts.push(district);
    }

    this.setState({
      county: county,
      counties: this.state.counties,
      district: districts[0],
      districts: districts,
      zipcode: data[county][districts[0]]
    }, function () {
      if (typeof this.props.handleChangeCounty === 'function') {
        this.props.handleChangeCounty(this.state);
      }
    });
  },
  changeDistrict: function (district) {
    var zipCode = data[this.state.county][[district][0]];

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
  changeZipcode: function (zipcode) {
    var county = '',
      district = '';

    for (var i in data) {
      if (data.hasOwnProperty(i)) {
        for (var j in data[i]) {
          if (data[i].hasOwnProperty(j)) {
            if (zipcode === data[i][j]) {
              county = i;
              district = j;
              break;
            }
          }
        }
      }
    }

    var counties = Object.keys(data),
      districts = Object.keys(data[county]);

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
  render: function () {
    return (
      <div>
        <County ref="county" name={this.props.countyName} className={this.props.css[0]} data={this.state.counties} defaultValue={this.state.county} changeCounty={this.changeCounty} />
        <District ref="district" name={this.props.districtName} className={this.props.css[1]} data={this.state.districts} defaultValue={this.state.district} changeDistrict={this.changeDistrict} />
        <ZipCode ref="zipcode" zipcodeSel={this.props.zipcodeSel} name={this.props.zipcodeName} className={this.props.css[2]} data={this.state.zipcode} changeZipcode={this.changeZipcode} />
      </div>
    )
  }
});

var County = React.createClass({
  _onChange: function (e) {
    var currentCounty = this.getDOMNode().value;
    this.props.changeCounty(currentCounty);
  },
  render: function () {
    var self = this;
    var counties = this.props.data.map(function (value) {
      return (
        <option value={value} selected={self.props.defaultValue == value}>{value}</option>
      );
    });

    return (
      <select name={this.props.name} className={this.props.className} onChange={this._onChange} defaultValue={this.props.defaultValue}>
        {counties}
      </select>
    )
  }
});

var District = React.createClass({
  _onChange: function (e) {
    var currentDistrict = this.getDOMNode().value;
    this.props.changeDistrict(currentDistrict);
  },
  render: function () {
    var self = this;
    var districts = this.props.data.map(function (value) {
      return (
        <option value={value} selected={self.props.defaultValue == value}>{value}</option>
      )
    });

    return (
      <select name={this.props.name} className={this.props.className} onChange={this._onChange} defaultValue={this.props.defaultValue}>
        {districts}
      </select>
    )
  }
});

var ZipCode = React.createClass({
  _onChange: function (e) {
    var zipCode = this.getDOMNode().value,
      i, j;

    if (3 === zipCode.length) {
      for (i in data) {
        if (data.hasOwnProperty(i)) {
          for (j in data[i]) {
            if (data[i].hasOwnProperty(j)) {
              if (zipCode === data[i][j]) {
                this.props.changeZipcode(zipCode);
                break;
              }
            }
          }
        }
      }
    }
  },
  componentDidMount: function () {
    // if (this.props.zipcodeSel !== '') {
    //   this.props.changeZipcode(this.props.zipcodeSel);
    // }
  },
  componentDidUpdate: function () {
    this.getDOMNode().value = this.props.data;
  },
  render: function () {
    return (
      <input type="text" className={this.props.className}
                         name={this.props.name}
                         onChange={this._onChange} />
    )
  }
});

module.exports = TWzipcode;
