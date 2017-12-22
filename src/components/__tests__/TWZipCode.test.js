import React from 'react';
import { mount } from 'enzyme';
import TWzipcode from '../TWZipCode';

describe('TWzipcode', function () { // eslint-disable-line func-names
  beforeEach(() => {
    jest.resetModules();

    this.params = {
      css: [
        'form-control county-sel',
        'form-control district-sel',
        'form-control zipcode',
      ],
      handleChangeCounty: jest.fn(),
      handleChangeDistrict: jest.fn(),
      handleChangeZipcode: jest.fn(),
    };

    this.makeSubject = () => {
      return mount(
        <TWzipcode
          { ...this.params }
        />
      );
    };
  });

  it('should call handleChangeCounty after changing countyValue', () => {
    const subject = this.makeSubject();

    subject.setProps({ countyValue: '台東縣' });
    expect(subject.props().handleChangeCounty).toBeCalled();
  });

  it('should call handleChangeDistrict after changing districtValue', () => {
    const subject = this.makeSubject();

    subject.setProps({ countyValue: '台東縣' });
    subject.setProps({ districtValue: '太麻里鄉' });
    expect(subject.props().handleChangeDistrict).toBeCalled();
  });

  it('should call handleChangeZipcode after changing zipcodeValue', () => {
    const subject = this.makeSubject();

    subject.setProps({ zipcodeValue: '251' });
    expect(subject.props().handleChangeZipcode).toBeCalled();
  });

  it('should call getCurrentPosition function', () => {
    this.params = {
      ...this.params,
      detect: true,
    };

    this.makeSubject();

    expect(global.navigator.geolocation.getCurrentPosition).toBeCalled();
  });
});
