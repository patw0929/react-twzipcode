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
                 zipcodeValue={'251'} />
    );
  });

  it('set zipcode as 251, then district should be "淡水區"', () => {
    let district = TestUtils.findRenderedComponentWithType(component, District);
    expect(district.props.value).to.equal('淡水區');
  });

  it('set district className', () => {
    let district = TestUtils.findRenderedComponentWithType(component, District);
    expect(findDOMNode(district).className).to.equal('form-control district-sel');
  });
});
