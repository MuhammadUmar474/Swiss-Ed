import {SET_LIVE_OFFICE_HOURS} from '../Actions/type';
const initialState = {
  Loading: false,
  OfficeHoursData:[]
};
export default function(state = initialState, action) {
  // console.log(action)

  switch (action.type) {
    case SET_LIVE_OFFICE_HOURS:
      return {
        ...state,
        OfficeHoursData: action.payload,
      };

    default:
    return state;
  }
}
