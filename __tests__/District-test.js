import '../.auto_mock_off';
import React, { findDOMNode } from 'react/addons';
import TWzipcode from '../src/containers/App';
import District from '../src/components/District';

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

  it('set zipcode as 251, then district should be "淡水區"', () => {
    let district = TestUtils.findRenderedComponentWithType(component, District);
    expect(district.props.defaultValue).toEqual('淡水區');
  });

  it('set district className', () => {
    let district = TestUtils.findRenderedComponentWithType(component, District);
    expect(findDOMNode(district).className).toEqual('form-control district-sel');
  });
});
