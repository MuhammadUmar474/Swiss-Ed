// import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
// // import apiReducer from './Reducer';
// import reducer from "./Reducers/reducers";

// const appReducers = combineReducers({
//     reducer,
// });

// const rootReducer = (state, action) => appReducers(state, action);

// const logger = createLogger();

// let middleware = [];
// middleware = [...middleware, thunk, logger];

// export default createStore(
//   rootReducer,
//   compose(applyMiddleware(...middleware))
// );

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers";
const initialState = {};
const middleware = [thunk];
const store = createStore(
rootReducer,
initialState,
compose(
applyMiddleware(...middleware),

)
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;