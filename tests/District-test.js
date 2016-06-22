import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import TWzipcode from '../src';
import District from '../src/components/District';

describe('County', () => {
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
        zipcodeValue={'251'}
      />
    );
  });

  it('set zipcode as 251, then district should be "淡水區"', () => {
    const district = TestUtils.findRenderedComponentWithType(component, District);
    expect(district.props.value).to.equal('淡水區');
  });

  it('set district className', () => {
    const district = TestUtils.findRenderedComponentWithType(component, District);
    expect(findDOMNode(district).className).to.equal('form-control district-sel');
  });

  it('change district', () => {
    const district = TestUtils.findRenderedComponentWithType(
      component,
      District
    );

    TestUtils.Simulate.change(findDOMNode(district), { target: { value: '石門區' } });
    expect(district.props.value).to.equal('石門區');
  });

  it('has default value', () => {
    const parent = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
        countyValue={'台北市'}
        districtValue={'中正區'}
      />
    );

    expect(parent.state.district).to.equal('中正區');
  });

  it('has not existing default value', () => {
    const parent = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
        countyValue={'台北市'}
        districtValue={'天龍區'}
      />
    );

    expect(parent.state.district).to.equal('中正區');
  });

  it('has handleChangeDistrict function', () => {
    let result = '';
    const handleChangeDistrict = (data) => {
      result = data.district;
    };
    const parent = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
        countyValue={'新北市'}
        handleChangeDistrict={handleChangeDistrict}
      />
    );

    const district = TestUtils.findRenderedComponentWithType(
      parent,
      District
    );

    TestUtils.Simulate.change(findDOMNode(district), { target: { value: '淡水區' } });
    expect(result).to.equal('淡水區');
  });
});
