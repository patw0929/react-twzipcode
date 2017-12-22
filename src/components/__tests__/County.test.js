import React from 'react';
import { mount } from 'enzyme';
import TWzipcode from '../TWZipCode';
import County from '../County';

describe('County', function () { // eslint-disable-line func-names
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

  it('should be "新北市" when setting zipcode as 251', () => {
    const subject = this.makeSubject();
    const countyComponent = subject.find(County);

    expect(countyComponent.props().value).toBe('新北市');
  });

  it('should has right className in county component', () => {
    const subject = this.makeSubject();
    const countyComponent = subject.find(County);

    expect(countyComponent.props().className).toBe('form-control county-sel');
  });

  it('should has default value', () => {
    this.params = {
      countyValue: '台北市',
      zipcodeValue: '',
    };
    const subject = this.makeSubject();

    expect(subject.state().county).toBe('台北市');
  });

  it('should call the handleChangeCounty function', () => {
    let result = '';
    const handleChangeCounty = (data) => {
      result = data.county;
    };

    this.params = {
      countyValue: '',
      zipcodeValue: '',
      handleChangeCounty,
    };
    const subject = this.makeSubject();
    const countyComponent = subject.find(County);

    countyComponent.simulate('change', { target: { value: '高雄市' } });

    expect(result).toBe('高雄市');
  });
});
