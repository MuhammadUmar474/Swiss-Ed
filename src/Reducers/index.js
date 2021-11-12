import {combineReducers} from 'redux';
import homeStates from './homeStates';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import coursesReducer from './coursesReducer';
import loadingReducer from './loadingReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import userReducer from './userReducer';
import officeHoursReducer from './officeHoursReducer';
import favouritesReducer from './favouritesReducer';

export default combineReducers({
  homeReducer: homeStates,
  registerReducer: registerReducer,
  loginReducer: loginReducer,
  courseReducer: coursesReducer,
  loadingReducer: loadingReducer,
  forgotPasswordRed: forgotPasswordReducer,
  userReducer: userReducer,
  officeHoursReducer: officeHoursReducer,
  favouritesReducer: favouritesReducer,
});
