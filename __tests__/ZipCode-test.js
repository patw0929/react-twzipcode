'use strict';

jest.dontMock('../src/TWzipcode.js');
jest.dontMock('../src/ZipCode.js');

describe('ZipCode', function() {
  var React = require('react/addons');
  var TWzipcode = require('../src/TWzipcode.js');
  var ZipCode = require('../src/ZipCode.js');
  var TestUtils = React.addons.TestUtils;
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
                 zipcodeSel={'200'} />
    );
  });

  it('set zipcode as 200', function() {
    var input = TestUtils.findRenderedComponentWithType(component, ZipCode).getDOMNode();
    expect(input.value).toEqual('200');
  });

  it('set zipcode className', function() {
    var input = TestUtils.findRenderedComponentWithType(component, ZipCode).getDOMNode();
    expect(input.className).toEqual('form-control zipcode');
  });

  it('change zipcode value', function() {
    var input = TestUtils.findRenderedComponentWithType(component, ZipCode);
    input.getDOMNode().value = '300';
    TestUtils.Simulate.change(input.getDOMNode());
    expect(input.props.data).toEqual('300');
  });
});
