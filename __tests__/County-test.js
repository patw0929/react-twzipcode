import '../.auto_mock_off';
import React, { findDOMNode } from 'react/addons';
import TWzipcode from '../src/containers/App';
import County from '../src/components/County';

describe('County', () => {
  var TestUtils = React.addons.TestUtils;
  var component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(
      <TWzipcode css={['form-control county-sel',
                       'form-control district-sel',
                       'form-control zipcode']}
                 zipcodeSel={'251'} />
    );
  });

  it('set zipcode as 251, then county should be "新北市"', function() {
    let county = TestUtils.findRenderedComponentWithType(component, County);
    expect(county.props.defaultValue).toEqual('新北市');
  });

  it('set county className', function() {
    let county = TestUtils.findRenderedComponentWithType(component, County);
    expect(findDOMNode(county).className).toEqual('form-control county-sel');
  });

  it('change county value', function() {
    let select = TestUtils.findRenderedComponentWithType(component, County);
    findDOMNode(select).value = '南海諸島';
    TestUtils.Simulate.change(findDOMNode(select));
    expect(select.props.defaultValue).toEqual('南海諸島');
  });
});
