import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import TWzipcode from '../src';
import ZipCode from '../src/components/ZipCode';

describe('ZipCode', () => {
  let component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
        zipcodeSel={'200'}
      />
    );
  });

  it('set zipcode as 200', () => {
    const input = TestUtils.findRenderedComponentWithType(component, ZipCode);
    expect(findDOMNode(input).value).to.equal('200');
  });

  it('set zipcode className', () => {
    const input = TestUtils.findRenderedComponentWithType(component, ZipCode);
    expect(findDOMNode(input).className).to.equal('form-control zipcode');
  });

  it('change zipcode value', () => {
    const input = TestUtils.findRenderedComponentWithType(component, ZipCode);
    findDOMNode(input).value = '300';
    TestUtils.Simulate.change(findDOMNode(input));
    expect(input.props.value).to.equal('300');
  });

  it('has handleChangeZipcode function', () => {
    let result = '';
    const handleChangeZipcode = (data) => {
      result = data.zipcode;
    };
    const parent = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
        handleChangeZipcode={handleChangeZipcode}
      />
    );

    const zipcode = TestUtils.findRenderedComponentWithType(
      parent,
      ZipCode
    );

    TestUtils.Simulate.change(findDOMNode(zipcode), { target: { value: '100' } });
    expect(result).to.equal('100');
  });

  it('detect geolocation', () => {
    const coords = {
      latitude: 25.175579025,
      longitude: 121.4384700,
    };
    global.navigator.geolocation = {
      getCurrentPosition(success, error, options) {  // eslint-disable-line
        if (typeof success === 'function') {
          success(coords);
        }
      },
    };

    const parent = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
        detect
      />
    );

    expect(parent.props.detect).to.equal(true);
  });
});
