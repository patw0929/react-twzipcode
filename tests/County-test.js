import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import TWzipcode from '../src';
import County from '../src/components/County';

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

  it('set zipcode as 251, then county should be "新北市"', () => {
    const county = TestUtils.findRenderedComponentWithType(component, County);
    expect(county.props.value).to.equal('新北市');
  });

  it('set county className', () => {
    const county = TestUtils.findRenderedComponentWithType(component, County);
    expect(findDOMNode(county).className).to.equal('form-control county-sel');
  });

  it('change county value', () => {
    const select = TestUtils.findRenderedComponentWithType(component, County);
    findDOMNode(select).value = '高雄市';
    TestUtils.Simulate.change(findDOMNode(select));
    expect(select.props.value).to.equal('高雄市');
  });

  it('has default value', () => {
    const parent = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
        countyValue={'台北市'}
      />
    );

    expect(parent.state.county).to.equal('台北市');
  });

  it('has handleChangeCounty function', () => {
    let result = '';
    const handleChangeCounty = (data) => {
      result = data.county;
    };
    const parent = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
        handleChangeCounty={handleChangeCounty}
      />
    );

    const county = TestUtils.findRenderedComponentWithType(
      parent,
      County
    );

    TestUtils.Simulate.change(findDOMNode(county), { target: { value: '高雄市' } });
    expect(result).to.equal('高雄市');
  });
});
