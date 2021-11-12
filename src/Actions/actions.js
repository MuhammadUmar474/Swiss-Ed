import {
  API_ENDPOINT,
  API_REGISTER_USER,
  SET_REGISTER,
  SAVE_ACCESS_TOKEN,
  NEW_PASSWORD_SUCCESS,
  SET_URL,
  FORGOT_PASSWORD,
  NEW_PASSWORD_ERROR,
  SAVE_REFRESH_TOKEN,
  SAVE_USER_DATA,
  API_GET_USER,
  SET_COURSE_DATA,
  LOGGED_IN,
  API_GET_COURSES,
  SET_COURSES,
  COURSES_API_ENDPOINT,
  SET_LOADING,
  API_GET_COURSE_DETAIL_BY_ID,
  LOGIN_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  SET_USER_DATA,
  SET_LIVE_OFFICE_HOURS,
  API_ERROR,
  API_GET_LIVE_OFFICE_HOURS,
  LOGOUT,
  UPDATE_PROFILE,
  PROFILE_UPDATED,
  UPDATE_PASSWORD,
  PASSWORD_CHANGE_ERROR,
  CANCEL_SUBSCRIPTION,
  API_FAVOURITES,
  SET_FAVOURITES,
  GET_FAVOURITES,
  SET_FAVORITE_ID,
  GET_RECENTLY_ADDED,
  SET_RECENTLY_ADDED,
  API_RECENTLY_ADDED,
  REMOVE_FAVORITE_VIDEO_COURSE,
  SET_FAVORITE_CONTENT,
  REMOVE_FAVORITE_CONTENT,
  SET_VIDEO_DATA,
  SET_VIDEO_FAV,
  SET_COURSE_ERROR_RESP,
  FAV_LOADING,
  PROFILE_LOADER,
  UPDATE_PROFILE_LOADER,
  REMOVE_FAVOURITES_VIDEO,
  REMOVE_FAVOURITES_CONTENT,
  REMOVE_FAV_LOADING,
} from './type';
import axios from 'axios';
import deviceStorage from './deviceStorage';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const postRequestRegister = (data, url) => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    const url1 = API_ENDPOINT + url;

    // console.log('testing: ', url1, data);

    const res = await axios.post(`${url1}`, data);
    // console.log(res, 'yerhaa response');
    if (res.status == 200) {
      // alert('Register Successful')
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      dispatch({
        type: SET_REGISTER,
        payload: res,
      });
    }
  } catch (error) {
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    // console.log('ye error aya h bhaai ', error.response.data);

    if (error.response.data) {
      dispatch({
        type: 'ERROR_REGISTER',
        payload: error.response.data.description,
      });
      // alert(error.response.data.description)
    }
    // dispatch({
    //   type: SET_REGISTER,
    //   payload: res
    // })
  }
};

export const postRequestLogin = (data, url) => async dispatch => {
  try {
    const url1 = API_ENDPOINT + url;

    // console.log('testing: ', url1, data);
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    const res = await axios.post(`${url1}`, data);
    // console.log(res.data, res.status, 'yerhaa response');

    if (res.status == 200) {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      dispatch({
        type: LOGOUT,
        payload: false,
      });
      deviceStorage.saveItem(SAVE_ACCESS_TOKEN, res.data.access_token);
      deviceStorage.saveItem('isLoggedin', 'true');
      deviceStorage.saveItem('USER_ID', res.data.id);
      deviceStorage.saveItem(SAVE_REFRESH_TOKEN, res.data.refresh_token);
      dispatch({
        type: LOGGED_IN,
        payload: true,
      });
      // to empty error msg on loginPassword screen
      dispatch({
        type: LOGIN_ERROR,
        payload: '',
      });
    } else {
      alert('Error');
    }
  } catch (error) {
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    // console.log('ye error aya h bhaai ', error, error.response);
    if (error.response.data) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.description,
      });
    }
  }
};

export const forgotPasswordRequest = (data, url) => async dispatch => {
  try {
    const url1 = API_ENDPOINT + url;

    // console.log('testing: ', url1, data);
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    let formDat = new FormData();
    formDat.append('email', data);
    const res = await axios.post(`${url1}`, formDat);
    // console.log(res.data, res.status, 'yerhaa response');

    if (res.status == 200) {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: true,
      });
    } else {
      alert('Error');
    }
  } catch (error) {
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    // console.log('ye error aya h bhaai ', error, error.response);
    if (error.response.data) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: error.response.data.description,
      });
      // alert(error.response.data.description)
      // dispatch({
      //   type: LOGIN_ERROR,
      //   payload: error.response.data.description
      // })
    }
  }
};

export const passwordReset = (data, id) => async dispatch => {
  try {
    const url1 = API_ENDPOINT + FORGOT_PASSWORD + id + '/?newPass=' + data;
    // console.log('testing: ', url1, data);
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    var config = {
      // headers: {
      //   'Authorization': 'Bearer '+ await AsyncStorage.getItem(SAVE_ACCESS_TOKEN),
      //   'Content-Type': 'application/json'
      // },
      params: {
        newPass: data,
      },
    };

    const res = await axios.put(`${url1}`);
    // console.log(res.data, res.status, 'yerhaa response');

    if (res.status == 200) {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: null,
      });
      // dispatch({
      //   type: SET_LOADING,
      //   payload: false
      // })
      await AsyncStorage.removeItem('emailUrl');
      dispatch({
        type: SET_URL,
        payload: false,
      });
      dispatch({
        type: NEW_PASSWORD_SUCCESS,
        payload: true,
      });
    } else {
      alert('Error');
    }
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: null,
    });
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    // console.log('ye error aya h bhaai ', error, error.response);
    if (error.response.data) {
      dispatch({
        type: NEW_PASSWORD_ERROR,
        payload: error.response.data.description,
      });
    }
  }
};
export const logout = () => async dispatch => {
  try {
    dispatch({
      type: LOGGED_IN,
      payload: false,
    });
    dispatch({
      type: LOGOUT,
      payload: true,
    });
    var config = {
      headers: {
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
        // 'Content-Type': 'application/json',
      },
    };

    console.log('ye hy ponka', await AsyncStorage.getItem(SAVE_ACCESS_TOKEN));
    const data = {
      id: await AsyncStorage.getItem('USER_ID'),
    };
    const url1 = API_ENDPOINT + 'loginAndRegister/logout/';
    console.log('testing: ', url1, data);
    const res = await axios.post(`${url1}`, null, config);
    console.log(res.data, res.status, 'yerhaa response');
    if (res.status == 200) {
      deviceStorage.removeItem('isLoggedin');
      deviceStorage.removeItem(SAVE_ACCESS_TOKEN);
    }
  } catch (error) {
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    // deviceStorage.removeItem('isLoggedin');
    // deviceStorage.removeItem(SAVE_ACCESS_TOKEN);
    console.log('ye error aya h bhaai ', error, error.response);
  }
};

export const resetStateFP = () => async dispatch => {
  dispatch({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: null,
  });
};

export const getRequestUserData = () => async dispatch => {
  try {
    dispatch({
      type: PROFILE_UPDATED,
      payload: false,
    });
    dispatch({
      type: PROFILE_LOADER,
      payload: true,
    });
    const url1 = API_ENDPOINT + API_GET_USER;

    // console.log(
    //   'testing:  ',
    //   await AsyncStorage.getItem(SAVE_ACCESS_TOKEN),
    //   url1,
    // );
    var config = {
      headers: {
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.get(`${url1}`, config);
    // console.log(res.data, 'yerhaa response');
    if (res.status == 200) {
      dispatch({
        type: SET_USER_DATA,
        payload: res.data,
      });
      await AsyncStorage.setItem('USER_DATA', JSON.stringify(res.data));
      dispatch({
        type: PROFILE_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    // console.log('ye error aya  ', JSON.stringify(error.response));
    if (error) {
      if (error.response.status == 401) {
        dispatch({
          type: SET_USER_DATA,
          payload: {},
        });
        dispatch({
          type: PROFILE_LOADER,
          payload: false,
        });
        deviceStorage.removeItem('isLoggedin');
        logout();
      }
      dispatch({
        type: PROFILE_LOADER,
        payload: false,
      });
      if (error.response.data) {
        alert(error.response.data.detail);
      }
    }

    // dispatch({
    //   type: SET_REGISTER,
    //   payload: res
    // })
  }
};
export const updateUserProfile = data => async dispatch => {
  try {
    var config = {
      headers: {
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
        'Content-Type': 'application/json',
      },
    };
    dispatch({
      type: UPDATE_PROFILE_LOADER,
      payload: true,
    });
    const url1 = API_ENDPOINT + UPDATE_PROFILE;
    // console.log('testing: ', url1, data, config);
    const res = await axios.patch(`${url1}`, data, config);
    // console.log(res.data.access, res, 'yerhaa response');
    if (res.status === 200) {
      dispatch({
        type: PROFILE_UPDATED,
        payload: true,
      });
      dispatch({
        type: UPDATE_PROFILE_LOADER,
        payload: false,
      });
      // dispatch(getRequestUserData())
    }
  } catch (error) {
    // console.log('ye error aya  ', JSON.stringify(error.response));
    dispatch({
      type: UPDATE_PROFILE_LOADER,
      payload: false,
    });
    if (error.response.status === 401 || error.response.status === 400) {
    }
  }
};
export const updateUserPassword = data => async dispatch => {
  try {
    var config = {
      headers: {
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
        'Content-Type': 'application/json',
      },
    };
    dispatch({
      type: PASSWORD_CHANGE_ERROR,
      payload: null,
    });

    const url1 = API_ENDPOINT + UPDATE_PASSWORD;
    // console.log('testing: ', url1, data, config);
    const res = await axios.patch(`${url1}`, data, config);
    // console.log(res.data.access, res, 'yerhaa response');
    if (res.status === 200) {
      dispatch({
        type: PROFILE_UPDATED,
        payload: true,
      });
      dispatch(logout());
    }
  } catch (error) {
    // console.log('ye error aya  ', JSON.stringify(error.response));
    if (error.response) {
      if (error.response.data) {
        dispatch({
          type: PASSWORD_CHANGE_ERROR,
          payload: error.response.data.description,
        });
      }
    }
  }
};

export const cancelSubscripion = id => async dispatch => {
  try {
    // console.log('here in  cancel sub api');
    const url1 = API_ENDPOINT + CANCEL_SUBSCRIPTION + id + '/';

    // console.log('cancel subscription api call ', url1);
    var config = {
      headers: {
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.delete(`${url1}`, config);
    // console.log(JSON.stringify(res.data), 'yerhaa response');
    if (res.status == 200) {
      dispatch(getRequestUserData());
    }
  } catch (error) {
    // console.log('ye error aya  ', error, JSON.stringify(error.response));
    if (error.response.status === 401) {
      // console.log('in hereee');
      dispatch(getRefreshToken('courses'));
      // logout();
    }
  }
};

export const getRequestCourses = () => async dispatch => {
  try {
    dispatch({
      type: SET_COURSES,
      payload: [],
    });

    const url1 = COURSES_API_ENDPOINT + API_GET_COURSES;

    console.log(
      'testing:  ',
      url1,
      await AsyncStorage.getItem(SAVE_ACCESS_TOKEN),
    );
    var config = {
      headers: {
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.get(`${url1}`, config);
    console.log(JSON.stringify(res.data), 'yerhaa response');
    if (res.status == 200) {
      // deviceStorage.saveItem(SAVE_USER_DATA,res.data.access_token)

      dispatch({
        type: SET_COURSES,
        payload: res.data,
      });
      // dispatch({
      //   type: SET_LOADING,
      //   payload: false
      // })
    }
  } catch (error) {
    // dispatch({
    //   type: SET_LOADING,
    //   payload: false
    // })

    // console.log('ye error aya  ', error, JSON.stringify(error.response));
    if (error.response.status === 401) {
      // console.log('in hereee');
      dispatch(getRefreshToken('courses'));
      // logout();
    }
  }
};
var j = 0;
export const getRefreshToken = from => async dispatch => {
  try {
    const data = {
      refresh: await AsyncStorage.getItem(SAVE_REFRESH_TOKEN),
      id: await AsyncStorage.getItem('USER_ID'),
    };

    const url1 = API_ENDPOINT + 'loginAndRegister/api/token/refresh/';
    // console.log('testing: ', url1, data);
    const res = await axios.post(`${url1}`, data);
    // console.log(res.data.access, res, 'yerhaa response');
    if (res.status === 200) {
      if (res.data.access) {
        await AsyncStorage.removeItem(SAVE_ACCESS_TOKEN);

        await deviceStorage.saveItem(SAVE_ACCESS_TOKEN, res.data.access);

        if (from == 'courses') {
          dispatch(getRequestCourses());
        }
      }
    }
  } catch (error) {
    // console.log('ye error aya  ', JSON.stringify(error.response));
    if (error.response.status === 401 || error.response.status === 400) {
      dispatch(logout());
    }
  }
};

export const getCoursesByID = id => async dispatch => {
  try {
    // dispatch({
    //   type: SET_LOADING,
    //   payload: true
    // })
    dispatch({
      type: SET_COURSE_ERROR_RESP,
      payload: null,
    });
    dispatch({
      type: SET_COURSE_DATA,
      payload: [],
    });
    const url1 = COURSES_API_ENDPOINT + API_GET_COURSE_DETAIL_BY_ID;

    // console.log('api:  ', url1, id);
    var config = {
      headers: {
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
        'Content-Type': 'application/json',
      },
      params: {
        courseId: id,
      },
    };

    const res = await axios.get(`${url1}`, config);
    // console.log(res, 'yerhaa response course id ka');

    if (res.data) {
      if (res.data.data) {
        // console.log(
        //   JSON.stringify(res.data.data),
        //   'yerhaa response course id ka',
        // );
      }
    }
    if (res.status == 200) {
      if (res.data) {
        if (res.data.data) {
          dispatch({
            type: SET_COURSE_DATA,
            payload: res.data.data,
          });
        }
      }

      // dispatch({
      //   type: SET_LOADING,
      //   payload: false
      // })
    }
  } catch (error) {
    // dispatch({
    //   type: SET_LOADING,
    //   payload: false
    // })

    // console.log('ye error aya h bhaai ', error);
    if (error.response.data) {
      dispatch({
        type: SET_COURSE_ERROR_RESP,
        payload: error.response.data.description,
      });
      // alert(error.response.data.description);
    }
    // dispatch({
    //   type: SET_REGISTER,
    //   payload: res
    // })
  }
};

export const setURL = () => async dispatch => {
  try {
    dispatch({
      type: SET_URL,
      payload: true,
    });
  } catch (error) {
    // console.log(error);
  }
};

export const getLiveOfficeHours = () => async dispatch => {
  try {
    const url1 = COURSES_API_ENDPOINT + API_GET_LIVE_OFFICE_HOURS;

    // console.log(
    //   'testing:  ',
    //   await AsyncStorage.getItem(SAVE_ACCESS_TOKEN),
    //   url1,
    // );
    var config = {
      headers: {
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.get(`${url1}`, config);
    // console.log(res.data, 'yerhaa response');
    if (res.status == 200) {
      dispatch({
        type: SET_LIVE_OFFICE_HOURS,
        payload: res.data,
      });
    }
  } catch (error) {
    // console.log('ye error aya h bhaai ', error);
    if (error.response.data) {
      alert(error.response.data.description);
    }
    // dispatch({
    //   type: SET_REGISTER,
    //   payload: res
    // })
  }
};
export const setDataForVideoPage = data => dispatch => {
  // console.log(data)
  dispatch({
    type: SET_VIDEO_DATA,
    payload: data,
  });
};
export const setVideoFavouriteDetail = (data, option) => async dispatch => {
  // console.log(data, option)

  if (option == 1) {
    try {
      var config = {
        headers: {
          Authorization:
            'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
          'Content-Type': 'application/json',
        },
      };
      let formData = new FormData();
      formData.append('video_id', data.id);
      const url1 = COURSES_API_ENDPOINT + API_FAVOURITES;
      // console.log('testing favourites: ', url1, formData, config);

      const res = await axios.post(`${url1}`, formData, config);
      // console.log(res.data, res, 'yerhaa response');

      if (res.status === 200) {
        dataa = {
          outerIndex: data.i,
          innerIndex: data.j,
          id: data.id,
        };
        dispatch({
          type: SET_FAVORITE_ID,
          payload: dataa,
        });
        dispatch({
          type: SET_VIDEO_FAV,
          payload: true,
        });
      }
    } catch (error) {
      // console.log('ye error aya  ', JSON.stringify(error.response));
      if (error.response.status === 401 || error.response.status === 400) {
      }
    }
  } else {
    try {
      var config = {
        headers: {
          Authorization:
            'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
          'Content-Type': 'application/json',
        },
      };
      let formData = new FormData();
      formData.append('video_id', data.id);
      const url1 = COURSES_API_ENDPOINT + API_FAVOURITES;
      // console.log('testing favourites: ', url1, formData, config);

      const res = await axios.patch(`${url1}`, formData, config);
      // console.log(res.data, res, 'yerhaa response');

      if (res.status === 200) {
        dataa = {
          outerIndex: data.i,
          innerIndex: data.j,
          id: data.id,
        };
        dispatch({
          type: REMOVE_FAVORITE_VIDEO_COURSE,
          payload: dataa,
        });
        dispatch({
          type: SET_VIDEO_FAV,
          payload: false,
        });
      }
    } catch (error) {
      // console.log('ye error aya  ', JSON.stringify(error.response));
      if (error.response.status === 401 || error.response.status === 400) {
      }
    }
  }
};

export const setVideoFavourite = (i, j, data, option) => async dispatch => {
  console.log(i, j, data, option);

  if (option == 1) {
    try {
      dispatch({
        type: FAV_LOADING,
        payload: true,
      });
      var config = {
        headers: {
          Authorization:
            'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
          'Content-Type': 'application/json',
        },
      };
      let formData = new FormData();
      formData.append('video_id', data);
      const url1 = COURSES_API_ENDPOINT + API_FAVOURITES;
      console.log('testing favourites: ', url1, formData, config);

      const res = await axios.post(`${url1}`, formData, config);
      console.log(res.data, res, 'yerhaa response');

      if (res.status === 200) {
        dataa = {
          outerIndex: i,
          innerIndex: j,
          id: data,
        };
        dispatch({
          type: SET_FAVORITE_ID,
          payload: dataa,
        });
        dispatch({
          type: FAV_LOADING,
          payload: false,
        });
      }
    } catch (error) {
      console.log('ye error aya  ', JSON.stringify(error.response));
      dispatch({
        type: FAV_LOADING,
        payload: false,
      });
      if (error) {
        if (error.response.status === 401 || error.response.status === 400) {
        }
      }
    }
  } else {
    try {
      var config = {
        headers: {
          Authorization:
            'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
          'Content-Type': 'application/json',
        },
      };
      dispatch({
        type: FAV_LOADING,
        payload: true,
      });
      let formData = new FormData();
      formData.append('video_id', data);
      const url1 = COURSES_API_ENDPOINT + API_FAVOURITES;
      console.log('testing favourites: ', url1, formData, config);

      const res = await axios.patch(`${url1}`, formData, config);
      console.log(res.data, res, 'yerhaa response');

      if (res.status === 200) {
        dataa = {
          outerIndex: i,
          innerIndex: j,
          id: data,
        };
        console.log('yahan bhy ayaaa', dataa);
        dispatch({
          type: REMOVE_FAVORITE_VIDEO_COURSE,
          payload: dataa,
        });
        dispatch({
          type: FAV_LOADING,
          payload: false,
        });
      }
    } catch (error) {
      console.log('ye error aya  ', JSON.stringify(error.response));
      dispatch({
        type: FAV_LOADING,
        payload: false,
      });
      if (error) {
        if (error.response.status === 401 || error.response.status === 400) {
        }
      }
    }
  }
};

export const contentFavourite = (i, j, data, option) => async dispatch => {
  // console.log(i, j, data, option)

  if (option == 1) {
    try {
      var config = {
        headers: {
          Authorization:
            'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
          'Content-Type': 'application/json',
        },
      };
      dispatch({
        type: FAV_LOADING,
        payload: true,
      });
      let formData = new FormData();
      formData.append('content_id', data);
      const url1 = COURSES_API_ENDPOINT + API_FAVOURITES;
      // console.log('testing favourites: ', url1, formData, config);

      const res = await axios.post(`${url1}`, formData, config);
      // console.log(res.data, res, 'yerhaa response');

      if (res.status === 200) {
        dataa = {
          outerIndex: i,
          innerIndex: j,
          id: data,
        };
        dispatch({
          type: SET_FAVORITE_CONTENT,
          payload: dataa,
        });
        dispatch({
          type: FAV_LOADING,
          payload: false,
        });
      }
    } catch (error) {
      // console.log('ye error aya  ', JSON.stringify(error.response));
      dispatch({
        type: FAV_LOADING,
        payload: false,
      });
      if (error.response.status === 401 || error.response.status === 400) {
      }
    }
  } else {
    try {
      var config = {
        headers: {
          Authorization:
            'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
          'Content-Type': 'application/json',
        },
      };
      dispatch({
        type: FAV_LOADING,
        payload: true,
      });
      let formData = new FormData();
      formData.append('content_id', data);
      const url1 = COURSES_API_ENDPOINT + API_FAVOURITES;
      // console.log('testing favourites: ', url1, formData, config);

      const res = await axios.patch(`${url1}`, formData, config);
      // console.log(res.data, res, 'yerhaa response');

      if (res.status === 200) {
        dataa = {
          outerIndex: i,
          innerIndex: j,
          id: data,
        };
        dispatch({
          type: REMOVE_FAVORITE_CONTENT,
          payload: dataa,
        });
        dispatch({
          type: FAV_LOADING,
          payload: false,
        });
      }
    } catch (error) {
      dispatch({
        type: FAV_LOADING,
        payload: false,
      });
      // console.log('ye error aya  ', JSON.stringify(error.response));
      if (error.response.status === 401 || error.response.status === 400) {
      }
    }
  }
};

export const getFavourites = () => async dispatch => {
  try {
    const url1 = COURSES_API_ENDPOINT + API_FAVOURITES;
    dispatch({
      type: GET_FAVOURITES,
      payload: null,
    });
    console.log(
      'testing fav:  ',
      await AsyncStorage.getItem(SAVE_ACCESS_TOKEN),
      url1,
    );
    var config = {
      headers: {
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
        'Content-Type': 'application/json',
      },
    };
    dispatch({
      type: 'ERROR_FAVOURITES',
      payload: null,
    });
    const res = await axios.get(`${url1}`, config);
    console.log(res, 'yerhaa response');
    if (res.status == 200) {
      dispatch({
        type: GET_FAVOURITES,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log('ye error aya h bhaai ', error, error.response);
    console.log('ye error aya h bhaai ', error.response);
    console.log('ye error aya h bhaai ', error.response.data);

    if (error.response.data) {
      dispatch({
        type: 'ERROR_FAVOURITES',
        payload: error.response.data,
      });
      // alert(error.response.data.detail);
    }
    // dispatch({
    //   type: SET_REGISTER,
    //   payload: res
    // })
  }
};

export const getRecentlyAdded = () => async dispatch => {
  try {
    dispatch({
      type: SET_RECENTLY_ADDED,
      payload: [],
    });

    const url1 = COURSES_API_ENDPOINT + API_RECENTLY_ADDED;

    // console.log(
    //   'testing recently added:  ',
    //   url1,
    //   await AsyncStorage.getItem(SAVE_ACCESS_TOKEN),
    // );
    var config = {
      headers: {
        Authorization:
          'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.get(`${url1}`, config);
    // console.log(JSON.stringify(res.data), 'yerhaa response');
    if (res.status == 200) {
      // deviceStorage.saveItem(SAVE_USER_DATA,res.data.access_token)

      dispatch({
        type: SET_RECENTLY_ADDED,
        payload: res.data,
      });
      // dispatch({
      //   type: SET_LOADING,
      //   payload: false
      // })
    }
  } catch (error) {
    // dispatch({
    //   type: SET_LOADING,
    //   payload: false
    // })

    // console.log('ye error aya  ', error, JSON.stringify(error.response));
    if (error.response.status === 401) {
      // console.log('in hereee');
      dispatch(getRefreshToken('courses'));
      // logout();
    }
  }
};

export const RemoveFavorite = (i, data, option) => async dispatch => {
  // console.log(i, data, option)

  if (option == 1) {
    try {
      var config = {
        headers: {
          Authorization:
            'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
          'Content-Type': 'application/json',
        },
      };
      dispatch({
        type: REMOVE_FAV_LOADING,
        payload: true,
      });
      let formData = new FormData();
      formData.append('video_id', data);
      const url1 = COURSES_API_ENDPOINT + API_FAVOURITES;
      // console.log('testing favourites: ', url1, formData, config);
      const res = await axios.patch(`${url1}`, formData, config);
      // console.log(res.data, res, 'yerhaa response');
      if (res.status === 200) {
        dispatch({
          type: REMOVE_FAVOURITES_VIDEO,
          payload: i,
        });
        dispatch({
          type: REMOVE_FAV_LOADING,
          payload: false,
        });
      }
    } catch (error) {
      // console.log('ye error aya  ', JSON.stringify(error.response));
      dispatch({
        type: REMOVE_FAV_LOADING,
        payload: false,
      });
      if (error.response.status === 401 || error.response.status === 400) {
      }
    }
  } else {
    try {
      var config = {
        headers: {
          Authorization:
            'Bearer ' + (await AsyncStorage.getItem(SAVE_ACCESS_TOKEN)),
          'Content-Type': 'application/json',
        },
      };
      dispatch({
        type: REMOVE_FAV_LOADING,
        payload: true,
      });
      let formData = new FormData();
      formData.append('content_id', data);
      const url1 = COURSES_API_ENDPOINT + API_FAVOURITES;
      // console.log('testing favourites: ', url1, formData, config);

      const res = await axios.patch(`${url1}`, formData, config);
      // console.log(res.data, res, 'yerhaa response');

      if (res.status === 200) {
        dispatch({
          type: REMOVE_FAVOURITES_CONTENT,
          payload: i,
        });
        dispatch({
          type: REMOVE_FAV_LOADING,
          payload: false,
        });
      }
    } catch (error) {
      dispatch({
        type: REMOVE_FAV_LOADING,
        payload: false,
      });
      // console.log('ye error aya  ', JSON.stringify(error.response));
      if (error.response.status === 401 || error.response.status === 400) {
      }
    }
  }
};
