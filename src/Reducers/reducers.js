import {
  GET_REPOS_SUCCESS,
  GET_REPO_INFO,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GET_USER,
  GET_REPO_INFO_SUCCESS,
  GET_REPO_INFO_FAIL,
  GET_REPOS_FAIL,
  GET_REPOS,
  API_PENDING,
API_SUCCESS,
API_ERROR
} from '../Actions/type';

const initialState = {  data: [],
error: ''};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // case GET_REPOS:
    //   return {...state, loading: true};
    // case GET_REPOS_SUCCESS:
    //   return {...state, loading: false, repos: action.payload.data};
    // case GET_REPOS_FAIL:
    //   return {...state, loading: false, error: 'Error getting repos info'};
    // case GET_REPO_INFO:
    //   return {...state, loadingInfo: true};
    // case GET_REPO_INFO_SUCCESS:
    //   return {...state, loadingInfo: false, repoInfo: action.payload.data};
    // case GET_REPO_INFO_FAIL:
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     loadingInfo: false,
    //     errorInfo: 'Error getting repo info',
    //   };
    // case GET_USER:
    //   return {...state, loadingProfile: true};
    // case GET_USER_SUCCESS:
    //   return {...state, loadingProfile: false, user: action.payload.data};
    // case GET_USER_FAIL:
    //   return {
    //     ...state,
    //     loadingProfile: false,
    //     errorUser: 'Error getting user info',
    //   };
    case API_PENDING:
      return {
        ...state,
      };
    case API_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case API_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function listRepos(user) {
  alert(user);
  return {
    type: GET_REPOS,
    payload: {
      request: {
        url: `/users/${user}/repos`,
      },
    },
  };
}

export function login(user) {
  alert(user);
  return {
    type: GET_REPOS,
    payload: {
      request: {
        url: `login`,
      },
    },
  };
}

//   export function getRepoDetail(user, repo) {
//     return {
//       type: GET_REPO_INFO,
//       payload: {
//         request: {
//           url: `/repos/${user}/${repo}`
//         }
//       }
//     };
//   }

//   export function getUser(user) {
//     return {
//       type: GET_USER,
//       payload: {
//         request: {
//           url: `/users/${user}`
//         }
//       }
//     };
