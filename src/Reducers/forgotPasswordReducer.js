import {FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR,NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_ERROR} from '../Actions/type';
const initialState = {
  forgotPwError: null,
  Loading: false,
  forgotPwSuccess: null,
  newPasswordSuccess: null,
  newPasswordError: null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPwSuccess: action.payload,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgotPwError: action.payload,
      };
    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        newPasswordSuccess: action.payload,
      };
    case NEW_PASSWORD_ERROR:
      return {
        ...state,
        newPasswordError: action.payload,
      };

    default:
      return state;
  }
}
