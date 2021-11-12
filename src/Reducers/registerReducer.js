import {OPEN_SEARCHBAR,SET_REGISTER} from '../Actions/type';
const initialState = {
  Loading: false,
  registerResponse: null,
  registerError:null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_REGISTER:
      return {
        ...state,
        registerResponse: action.payload,
      };
    case "ERROR_REGISTER":  
      return {
      ...state,
      registerError: action.payload,
    }; 
    default:
      return state;
  }
}
