import {OPEN_SEARCHBAR} from './type';

export const setShowbar = () => async dispatch => {
  dispatch({
    type: OPEN_SEARCHBAR,
  });
};
