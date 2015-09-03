import '../../.auto_mock_off';

import * as types from '../../src/constants/actionTypes';
import { twzipcodeData as reducer } from '../../src/reducers/index';
import Data from '../../src/components/Data';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      county: '',
      counties: Object.keys(Data),
      district: '',
      districts: [],
      zipcode: ''
    });
  });

  it('should handle GET_PROPS_DATA', () => {
    expect(reducer({
      county: '台北市',
      counties: Object.keys(Data),
      district: '中正區',
      districts: ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'],
      zipcode: '100'
    }, {
      type: types.GET_PROPS_DATA,
      data: {
        county: '新北市',
        district: '淡水區',
        districts: ['萬里區', '金山區', '板橋區', '汐止區', '深坑區', '石碇區', '瑞芳區', '平溪區', '雙溪區', '貢寮區', '新店區', '坪林區', '烏來區', '永和區', '中和區', '土城區', '三峽區', '樹林區', '鶯歌區', '三重區', '新莊區', '泰山區', '林口區', '蘆洲區', '五股區', '八里區', '淡水區', '三芝區', '石門區'],
        zipcode: '251'
      }
    })).toEqual({
      county: '新北市',
      counties: Object.keys(Data),
      district: '淡水區',
      districts: ['萬里區', '金山區', '板橋區', '汐止區', '深坑區', '石碇區', '瑞芳區', '平溪區', '雙溪區', '貢寮區', '新店區', '坪林區', '烏來區', '永和區', '中和區', '土城區', '三峽區', '樹林區', '鶯歌區', '三重區', '新莊區', '泰山區', '林口區', '蘆洲區', '五股區', '八里區', '淡水區', '三芝區', '石門區'],
      zipcode: '251'
    });
  });

  it('should handle CHANGE_COUNTY', () => {
    expect(reducer({
      county: '台北市',
      counties: Object.keys(Data),
      district: '中正區',
      districts: ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'],
      zipcode: '100'
    }, {
      type: types.CHANGE_COUNTY,
      data: {
        county: '新北市'
      }
    })).toEqual({
      county: '新北市',
      counties: Object.keys(Data),
      district: '萬里區',
      districts: ['萬里區', '金山區', '板橋區', '汐止區', '深坑區', '石碇區', '瑞芳區', '平溪區', '雙溪區', '貢寮區', '新店區', '坪林區', '烏來區', '永和區', '中和區', '土城區', '三峽區', '樹林區', '鶯歌區', '三重區', '新莊區', '泰山區', '林口區', '蘆洲區', '五股區', '八里區', '淡水區', '三芝區', '石門區'],
      zipcode: '207'
    });
  });

  it('should handle CHANGE_DISTRICT', () => {
    expect(reducer({
      county: '台北市',
      counties: Object.keys(Data),
      district: '中正區',
      districts: ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'],
      zipcode: '100'
    }, {
      type: types.CHANGE_DISTRICT,
      data: {
        district: '士林區',
        zipcode: '111'
      }
    })).toEqual({
      county: '台北市',
      counties: Object.keys(Data),
      district: '士林區',
      districts: ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'],
      zipcode: '111'
    });
  });

  it('should handle CHANGE_ZIPCODE', () => {
    expect(reducer({
      county: '台北市',
      counties: Object.keys(Data),
      district: '中正區',
      districts: ['中正區', '大同區', '中山區', '松山區', '大安區', '萬華區', '信義區', '士林區', '北投區', '內湖區', '南港區', '文山區'],
      zipcode: '100'
    }, {
      type: types.CHANGE_ZIPCODE,
      data: {
        zipcode: '952'
      }
    })).toEqual({
      county: '台東縣',
      counties: Object.keys(Data),
      district: '蘭嶼鄉',
      districts: ['臺東市', '綠島鄉', '蘭嶼鄉', '延平鄉', '卑南鄉', '鹿野鄉', '關山鎮', '海端鄉', '池上鄉', '東河鄉', '成功鎮', '長濱鄉', '太麻里鄉', '金峰鄉', '大武鄉', '達仁鄉'],
      zipcode: '952'
    });
  });
});
