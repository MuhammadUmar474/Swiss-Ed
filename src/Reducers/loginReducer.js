import { OPEN_SEARCHBAR, LOGGED_IN, LOGIN_ERROR,SET_LOADING } from '../Actions/type';
const initialState = {
  LoginError: null,
  Loading: false,
  isLoggedin: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        isLoggedin: action.payload,
        
      };

    case LOGIN_ERROR:
      return {
        ...state,
        LoginError: action.payload,

      };
    case SET_LOADING:
      return {
        ...state,

        Loading: action.payload,
      };


    default:
      return state;
  }
}
