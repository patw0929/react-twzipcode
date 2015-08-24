'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Data = require('./Data');

var _Data2 = _interopRequireDefault(_Data);

var _County = require('./County');

var _County2 = _interopRequireDefault(_County);

var _District = require('./District');

var _District2 = _interopRequireDefault(_District);

var _ZipCode = require('./ZipCode');

var _ZipCode2 = _interopRequireDefault(_ZipCode);

exports['default'] = _react2['default'].createClass({
  displayName: 'TWzipcode',

  propTypes: {
    changeDistrict: _react2['default'].PropTypes.func,
    countyName: _react2['default'].PropTypes.string,
    countySel: _react2['default'].PropTypes.string,
    css: _react2['default'].PropTypes.array,
    detect: _react2['default'].PropTypes.bool,
    districtName: _react2['default'].PropTypes.string,
    districtSel: _react2['default'].PropTypes.string,
    googleMapsKey: _react2['default'].PropTypes.string,
    handleChangeCounty: _react2['default'].PropTypes.func,
    handleChangeDistrict: _react2['default'].PropTypes.func,
    handleChangeZipcode: _react2['default'].PropTypes.func,
    zipcodeName: _react2['default'].PropTypes.string,
    zipcodeSel: _react2['default'].PropTypes.string
  },
  getInitialState: function getInitialState() {
    return {
      county: '',
      counties: Object.keys(_Data2['default']),
      district: '',
      districts: [],
      zipcode: ''
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      countyName: 'county',
      countySel: '',
      css: ['county-sel', 'district-sel', 'zipcode'],
      detect: false,
      districtName: 'district',
      districtSel: '',
      zipcodeName: 'zipcode',
      zipcodeSel: '',
      googleMapsKey: ''
    };
  },
  geoLocation: function geoLocation() {
    var _this = this;

    var geolocation = navigator.geolocation,
        options = {
      'maximumAge': 600000,
      'timeout': 10000,
      'enableHighAccuracy': false
    };

    if (!geolocation) {
      return;
    }

    var serializeObject = function serializeObject(obj) {
      var pairs = [];
      for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
          continue;
        }
        pairs.push(prop + '=' + obj[prop]);
      }
      return pairs.join('&');
    };

    geolocation.getCurrentPosition(function (loc) {
      var latlng = {},
          googleGeocodeApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

      if ('coords' in loc && 'latitude' in loc.coords && 'longitude' in loc.coords) {
        latlng = [loc.coords.latitude, loc.coords.longitude];
        var xmlhttp = new XMLHttpRequest(),
            sendData = {
          'sensor': false,
          'latlng': latlng.join(','),
          'key': _this.props.googleMapsKey
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

            if (data && data.hasOwnProperty('results') && data.results[0].hasOwnProperty('address_components') && undefined !== data.results[0].address_components[0]) {
              postal = data.results[0].address_components[data.results[0].address_components.length - 1].long_name;
              if (postal) {
                _this.changeZipcode(postal);
              }
            }
          }
        };
      }
    }, function () {
      // error
    }, options);
  },
  componentDidMount: function componentDidMount() {
    var county,
        counties,
        district,
        districts = [],
        zipcode;

    counties = Object.keys(_Data2['default']);

    if (this.props.countySel === '') {
      county = counties[0];
    } else {
      county = this.props.countySel;
    }

    for (var d in _Data2['default'][county]) {
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

    zipcode = _Data2['default'][county][district];

    if (this.props.detect) {
      this.geoLocation();
    }

    this.setInitialState(county, counties, district, districts, zipcode);

    if (this.props.zipcodeSel !== '') {
      this.changeZipcode(this.props.zipcodeSel);
    }
  },
  setInitialState: function setInitialState(county, counties, district, districts, zipcode) {
    this.setState({
      county: county,
      counties: counties,
      district: district,
      districts: districts,
      zipcode: zipcode
    });
  },
  changeCounty: function changeCounty(county) {
    var districts = [];
    for (var district in _Data2['default'][county]) {
      districts.push(district);
    }

    this.setState({
      county: county,
      counties: this.state.counties,
      district: districts[0],
      districts: districts,
      zipcode: _Data2['default'][county][districts[0]]
    }, function () {
      if (typeof this.props.handleChangeCounty === 'function') {
        this.props.handleChangeCounty(this.state);
      }
    });
  },
  changeDistrict: function changeDistrict(district) {
    var zipCode = _Data2['default'][this.state.county][[district][0]];

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
  changeZipcode: function changeZipcode(zipcode) {
    var county = '',
        district = '';

    for (var i in _Data2['default']) {
      if (_Data2['default'].hasOwnProperty(i)) {
        for (var j in _Data2['default'][i]) {
          if (_Data2['default'][i].hasOwnProperty(j)) {
            if (zipcode === _Data2['default'][i][j]) {
              county = i;
              district = j;
              break;
            }
          }
        }
      }
    }

    var counties = Object.keys(_Data2['default']),
        districts = Object.keys(_Data2['default'][county]);

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
  render: function render() {
    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(_County2['default'], { ref: 'county', name: this.props.countyName, className: this.props.css[0], data: this.state.counties, defaultValue: this.state.county, changeCounty: this.changeCounty }),
      _react2['default'].createElement(_District2['default'], { ref: 'district', name: this.props.districtName, className: this.props.css[1], data: this.state.districts, defaultValue: this.state.district, changeDistrict: this.changeDistrict }),
      _react2['default'].createElement(_ZipCode2['default'], { ref: 'zipcode', zipcodeSel: this.props.zipcodeSel, name: this.props.zipcodeName, className: this.props.css[2], data: this.state.zipcode, changeZipcode: this.changeZipcode })
    );
  }
});
module.exports = exports['default'];