import {
  GET_PROPS_DATA,
  CHANGE_COUNTY,
  CHANGE_DISTRICT,
  CHANGE_ZIPCODE
} from '../constants/actionTypes';
import Data from '../components/Data';

let initialState = {
  county: '',
  counties: Object.keys(Data),
  district: '',
  districts: [],
  zipcode: ''
}

export default function twzipcodeReducer(state = initialState, action) {
  switch (action.type) {
  case GET_PROPS_DATA:
    return {
      ...state,
      county: action.data.county,
      district: action.data.district,
      districts: action.data.districts,
      zipcode: action.data.zipcode
    }

  case CHANGE_COUNTY:
    let districts = [];
    for (let district in Data[action.data.county]) {
      if (Data[action.data.county].hasOwnProperty(district)) {
        districts.push(district);
      }
    }

    return {
      ...state,
      county: action.data.county,
      district: districts[0],
      districts: districts,
      zipcode: Data[action.data.county][districts[0]]
    }

  case CHANGE_DISTRICT:
    let zipCode = Data[state.county][[action.data.district][0]];

    return {
      ...state,
      district: action.data.district,
      zipcode: zipCode
    }

  case CHANGE_ZIPCODE:
    let county = '',
      district = '';

    for (let i in Data) {
      if (Data.hasOwnProperty(i)) {
        for (let j in Data[i]) {
          if (Data[i].hasOwnProperty(j)) {
            if (action.data.zipcode === Data[i][j]) {
              county = i;
              district = j;
              break;
            }
          }
        }
      }
    }

    return {
      ...state,
      county: county,
      district: district,
      districts: Object.keys(Data[county]),
      zipcode: action.data.zipcode
    }

  default:
    return state;
  }
};
