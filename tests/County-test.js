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
                 zipcodeValue={'251'} />
    );
  });

  it('set zipcode as 251, then county should be "新北市"', () => {
    const county = TestUtils.findRenderedComponentWithType(component, County);
    expect(county.props.value).to.equal('新北市');
  });

  it('set county className', () => {
    let county = TestUtils.findRenderedComponentWithType(component, County);
    expect(findDOMNode(county).className).to.equal('form-control county-sel');
  });

  it('change county value', () => {
    let select = TestUtils.findRenderedComponentWithType(component, County);
    findDOMNode(select).value = '高雄市';
    TestUtils.Simulate.change(findDOMNode(select));
    expect(select.props.value).to.equal('高雄市');
  });
});
