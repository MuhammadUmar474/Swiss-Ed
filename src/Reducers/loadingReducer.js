import {SET_LOADING} from '../Actions/type';
const initialState = {
  loading: false,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}
