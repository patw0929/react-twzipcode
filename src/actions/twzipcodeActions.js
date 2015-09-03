import {
  GET_PROPS_DATA,
  CHANGE_COUNTY,
  CHANGE_DISTRICT,
  CHANGE_ZIPCODE
} from '../constants/actionTypes';

export function getInitData(county, district, districts, zipcode) {
  return {
    type: GET_PROPS_DATA,
    data: {
      county: county,
      district: district,
      districts: districts,
      zipcode: zipcode
    }
  };
}

export function changeCounty(county) {
  return {
    type: CHANGE_COUNTY,
    data: {
      county: county
    }
  };
}

export function changeDistrict(district) {
  return {
    type: CHANGE_DISTRICT,
    data: {
      district: district
    }
  };
}

export function changeZipcode(zipcode) {
  return {
    type: CHANGE_ZIPCODE,
    data: {
      zipcode: zipcode
    }
  };
}
