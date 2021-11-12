import {
  SET_FAVOURITES, GET_FAVOURITES, REMOVE_FAVOURITES_VIDEO,
  REMOVE_FAVOURITES_CONTENT,REMOVE_FAV_LOADING
} from '../Actions/type';
const initialState = {
  Loading: false,
  favouritesResponse: null,
  favouritesError: null,
  isFavourite: false,
  favLoading:false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FAVOURITES:
      return {
        ...state,
        isFavourite: action.payload,
      };
    case 'ERROR_FAVOURITES':
      return {
        ...state,
        favouritesError: action.payload,
      };
    case GET_FAVOURITES:
      return {
        ...state,
        favouritesResponse: action.payload,
      };
    case REMOVE_FAVOURITES_VIDEO:
      return {
        ...state,
        ...state.favouritesResponse.videos.splice(action.payload, 1),
      };
    case REMOVE_FAVOURITES_CONTENT:
      return {
        ...state,
        ...state.favouritesResponse.contents.splice(action.payload, 1),
      };
      case REMOVE_FAV_LOADING:
        return {
          ...state,
          favLoading: action.payload,
        };

    default:
      return state;
  }
}
