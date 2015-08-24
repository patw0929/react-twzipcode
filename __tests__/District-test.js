'use strict';

jest.dontMock('../src/TWzipcode.js');
jest.dontMock('../src/District.js');

describe('County', function() {
  var React = require('react/addons');
  var TWzipcode = require('../src/TWzipcode.js');
  var District = require('../src/District.js');
  var TestUtils = React.addons.TestUtils;
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
                 zipcodeSel={'251'} />
    );
  });

  it('set zipcode as 251, then district should be "淡水區"', function() {
    var district = TestUtils.findRenderedComponentWithType(component, District);
    expect(district.props.defaultValue).toEqual('淡水區');
  });

  it('set district className', function() {
    var district = TestUtils.findRenderedComponentWithType(component, District).getDOMNode();
    expect(district.className).toEqual('form-control district-sel');
  });
});
