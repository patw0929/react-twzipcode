jest.dontMock('../src/TWzipcode.js');

describe('DefaultZipcode', function() {
  var React = require('react/addons');
  var TWzipcode = require('../src/TWzipcode.js');
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
    expect(component.state.zipcode).toEqual('200');
  });
});
