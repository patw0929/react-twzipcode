import React from 'react';
import { mount } from 'enzyme';
import TWzipcode from '../TWZipCode';
import ZipCode from '../ZipCode';

describe('ZipCode', function () { // eslint-disable-line func-names
  beforeEach(() => {
    jest.resetModules();

    this.params = {
      css: [
        'form-control county-sel',
        'form-control district-sel',
        'form-control zipcode',
      ],
      zipcodeValue: '200',
    };

    this.makeSubject = () => {
      return mount(
        <TWzipcode
          { ...this.params }
        />
      );
    };
  });

  it('should set the zipcode as 200', () => {
    const subject = this.makeSubject();
    const zipcodeComponent = subject.find(ZipCode);

    expect(zipcodeComponent.props().value).toBe('200');
  });

  it('should set the zipcode className', () => {
    const subject = this.makeSubject();
    const zipcodeComponent = subject.find(ZipCode);

    expect(zipcodeComponent.props().className).toBe('form-control zipcode');
  });

  it('should call handleChangeZipcode function', () => {
    let result = '';
    const handleChangeZipcode = (data) => {
      result = data.zipcode;
    };

    this.params = {
      countyValue: '',
      zipcodeValue: '',
      handleChangeZipcode,
    };
    const subject = this.makeSubject();
    const zipcodeComponent = subject.find(ZipCode);

    zipcodeComponent.find('input').simulate('change', { target: { value: '100' } });

    expect(result).toBe('100');
  });

  it('should activating detection of geolocation', () => {
    global.navigator.geolocation = {
      getCurrentPosition(success, error, options) {  // eslint-disable-line
        if (typeof success === 'function') {
          success({
            latitude: 25.175579025,
            longitude: 121.4384700,
          });
        }
      },
    };

    this.params = {
      countyValue: '',
      zipcodeValue: '',
      detect: true,
    };
    const subject = this.makeSubject();

    expect(subject.props().detect).toBeTruthy();
  });
});
