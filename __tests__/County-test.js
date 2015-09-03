jest.dontMock('../src/components/TWzipcode.js');
jest.dontMock('../src/components/County.js');

describe('County', function() {
  var React = require('react/addons');
  var TWzipcode = require('../src/components/TWzipcode.js');
  var County = require('../src/components/County.js');
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

  it('set zipcode as 251, then county should be "新北市"', function() {
    var county = TestUtils.findRenderedComponentWithType(component, County);
    expect(county.props.defaultValue).toEqual('新北市');
  });

  it('set county className', function() {
    var county = TestUtils.findRenderedComponentWithType(component, County);
    expect(React.findDOMNode(county).className).toEqual('form-control county-sel');
  });

  it('change county value', function() {
    var select = TestUtils.findRenderedComponentWithType(component, County);
    React.findDOMNode(select).value = '南海諸島';
    TestUtils.Simulate.change(React.findDOMNode(select));
    expect(select.props.defaultValue).toEqual('南海諸島');
  });
});
