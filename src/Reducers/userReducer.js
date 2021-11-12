import { SET_USER_DATA, PROFILE_UPDATED, PASSWORD_CHANGE_ERROR,PROFILE_LOADER,UPDATE_PROFILE_LOADER } from '../Actions/type';
const initialState = {
  Loading: false,
  UserData: {},
  profileUpdated: false,
  passwordError: null,
  updateLoading: false,
};
export default function (state = initialState, action) {
  // console.log(action)

  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        UserData: action.payload,
      };
    case PROFILE_UPDATED:
      return {
        ...state,
        profileUpdated: action.payload,
      };
    case PROFILE_LOADER:
      return {
        ...state,
        Loading: action.payload,
      };
    case UPDATE_PROFILE_LOADER:
      return {
        ...state,
        updateLoading: action.payload,
      };
    case PASSWORD_CHANGE_ERROR:
      return {
        ...state,
        passwordError: action.payload,
      };

    default:
      return state;
  }
}
