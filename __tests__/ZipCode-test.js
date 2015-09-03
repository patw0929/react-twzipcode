import '../.auto_mock_off';
import React, { findDOMNode } from 'react/addons';
import TWzipcode from '../src/containers/App';
import ZipCode from '../src/components/ZipCode';

describe('ZipCode', () => {
  var TestUtils = React.addons.TestUtils;
  var component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
                 zipcodeSel={'200'} />
    );
  });

  it('set zipcode as 200', () => {
    let input = TestUtils.findRenderedComponentWithType(component, ZipCode);
    expect(findDOMNode(input).value).toEqual('200');
  });

  it('set zipcode className', () => {
    let input = TestUtils.findRenderedComponentWithType(component, ZipCode);
    expect(findDOMNode(input).className).toEqual('form-control zipcode');
  });

  it('change zipcode value', () => {
    let input = TestUtils.findRenderedComponentWithType(component, ZipCode);
    findDOMNode(input).value = '300';
    TestUtils.Simulate.change(findDOMNode(input));
    expect(input.props.data).toEqual('300');
  });
});
