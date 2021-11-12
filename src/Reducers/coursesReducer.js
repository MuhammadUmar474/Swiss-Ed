import { OPEN_SEARCHBAR, SET_COURSES, SET_COURSE_DATA, LOGOUT, SET_FAVORITE_ID, REMOVE_FAVORITE_VIDEO_COURSE, SET_FAVORITE_CONTENT, REMOVE_FAVORITE_CONTENT, SET_VIDEO_DATA, SET_VIDEO_FAV, SET_COURSE_ERROR_RESP, FAV_LOADING, SET_RECENTLY_ADDED } from '../Actions/type';
const initialState = {
  Loading: false,
  courses: [],
  recentlyAdded: [],
  count: 0,
  CourseData: [],
  CourseDataError: null,
  videoData: {},
  isLogout: false,
  FavLoading:false,
};
export default function(state = initialState, action) {
  console.log(action);

  switch (action.type) {
    case FAV_LOADING:
      return {
        ...state,
        FavLoading: action.payload,
      };
    case SET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case SET_COURSE_DATA:
      return {
        ...state,
        CourseData: action.payload,
      };

    case SET_COURSE_ERROR_RESP:
      return {
        ...state,
        CourseDataError: action.payload,
      };
    case SET_RECENTLY_ADDED:
      return {
        ...state,
        recentlyAdded: action.payload.courses,
        count: action.payload.count,
      };
     
    case SET_VIDEO_DATA:
      return {
        ...state,
        videoData: action.payload,
      };
    case SET_VIDEO_FAV:
      return {
        ...state,
        ...state.videoData.favourite = action.payload,
      };
    case SET_FAVORITE_ID:
      return {
        ...state,
        ...(state.CourseData[action.payload.outerIndex].videos[
          action.payload.innerIndex
        ].favourite = true),
      };

    case REMOVE_FAVORITE_VIDEO_COURSE:
      return {
        ...state,
        ...(state.CourseData[action.payload.outerIndex].videos[
          action.payload.innerIndex
        ].favourite = false),
      };

    case SET_FAVORITE_CONTENT:
      return {
        ...state,
        ...(state.CourseData[action.payload.outerIndex].content[
          action.payload.innerIndex
        ].favourite = true),
      };

    case REMOVE_FAVORITE_CONTENT:
      return {
        ...state,
        ...(state.CourseData[action.payload.outerIndex].content[
          action.payload.innerIndex
        ].favourite = false),
      };

    case LOGOUT:
      return {
        ...state,
        isLogout: action.payload,
      };
    default:
      return state;
  }
}
