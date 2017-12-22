import React from 'react';
import { mount } from 'enzyme';
import TWzipcode from '../TWZipCode';
import District from '../District';

describe('District', function () { // eslint-disable-line func-names
  beforeEach(() => {
    jest.resetModules();

    this.params = {
      css: [
        'form-control county-sel',
        'form-control district-sel',
        'form-control zipcode',
      ],
      zipcodeValue: '251',
    };

    this.makeSubject = () => {
      return mount(
        <TWzipcode
          { ...this.params }
        />
      );
    };
  });

  it('should has the "淡水區" in district field when setting the zipcode as 251', () => {
    const subject = this.makeSubject();
    const districtComponent = subject.find(District);

    expect(districtComponent.props().value).toBe('淡水區');
  });

  it('set district className', () => {
    const subject = this.makeSubject();
    const districtComponent = subject.find(District);

    expect(districtComponent.props().className).toBe('form-control district-sel');
  });

  it('should set the default value', () => {
    this.params = {
      countyValue: '台北市',
      districtValue: '中正區',
      zipcodeValue: '',
    };
    const subject = this.makeSubject();

    expect(subject.state().district).toBe('中正區');
  });

  it('should fallback to default value when setting the not existing value', () => {
    this.params = {
      countyValue: '台北市',
      districtValue: '天龍區',
      zipcodeValue: '',
    };
    const subject = this.makeSubject();

    expect(subject.state().district).toBe('中正區');
  });

  it('should call the handleChangeDistrict function', () => {
    let result = '';
    const handleChangeDistrict = (data) => {
      result = data.district;
    };

    this.params = {
      countyValue: '',
      zipcodeValue: '',
      handleChangeDistrict,
    };
    const subject = this.makeSubject();
    const districtComponent = subject.find(District);

    districtComponent.find('select').simulate('change', { target: { value: '淡水區' } });
    expect(result).toBe('淡水區');
  });
});
