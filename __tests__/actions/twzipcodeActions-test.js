import '../../.auto_mock_off';

import * as types from '../../src/constants/actionTypes';
import * as actions from '../../src/actions/twzipcodeActions';

describe('actions', () => {
  it('getInitData should create GET_PROPS_DATA action', () => {
    expect(actions.getInitData('新北市', '淡水區', ['淡水區'], '251')).toEqual({
      type: types.GET_PROPS_DATA,
      data: {
        county: '新北市',
        district: '淡水區',
        districts: ['淡水區'],
        zipcode: '251'
      }
    });
  });

  it('changeCounty should create CHANGE_COUNTY action', () => {
    expect(actions.changeCounty('新北市')).toEqual({
      type: types.CHANGE_COUNTY,
      data: {
        county: '新北市'
      }
    });
  });

  it('changeDistrict should create CHANGE_DISTRICT action', () => {
    expect(actions.changeDistrict('淡水區')).toEqual({
      type: types.CHANGE_DISTRICT,
      data: {
        district: '淡水區'
      }
    });
  });

  it('changeZipcode should create CHANGE_ZIPCODE action', () => {
    expect(actions.changeZipcode('251')).toEqual({
      type: types.CHANGE_ZIPCODE,
      data: {
        zipcode: '251'
      }
    });
  });
});
