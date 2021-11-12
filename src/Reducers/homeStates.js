import {OPEN_SEARCHBAR, SET_URL} from '../Actions/type';
const initialState = {
  showBar: false,
  isURL: false,
  email:''
};
export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_SEARCHBAR:
      return {
        ...state,
        showBar: !state.showBar,
      };

    case SET_URL:
      return {
        ...state,
        isURL: action.payload
      }

    default:
      return state;
  }
}
