jest.dontMock('../src/components/TWzipcode.js');
jest.dontMock('../src/components/ZipCode.js');

describe('ZipCode', function() {
  var React = require('react/addons');
  var TWzipcode = require('../src/components/TWzipcode.js');
  var ZipCode = require('../src/components/ZipCode.js');
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
    var input = TestUtils.findRenderedComponentWithType(component, ZipCode);
    expect(React.findDOMNode(input).value).toEqual('200');
  });

  it('set zipcode className', function() {
    var input = TestUtils.findRenderedComponentWithType(component, ZipCode);
    expect(React.findDOMNode(input).className).toEqual('form-control zipcode');
  });

  it('change zipcode value', function() {
    var input = TestUtils.findRenderedComponentWithType(component, ZipCode);
    React.findDOMNode(input).value = '300';
    TestUtils.Simulate.change(React.findDOMNode(input));
    expect(input.props.data).toEqual('300');
  });
});
