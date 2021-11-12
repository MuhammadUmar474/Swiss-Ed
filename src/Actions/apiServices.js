import axios from 'axios';
import {fetchData, fetchSuccess, fetchError} from './actions';

export const getService = url => dispatch => {
  return new Promise(() => {
    alert(url)
    axios
      .get(url)
      .then(response => {
        alert(url)
        // dispatch(fetchSuccess(response.data));
      })
      .catch(error => {
        // alert(url)

        // dispatch(fetchError(error));
      });
  });
};
export const postService = (url, data) => dispatch => {
  return new Promise(() => {
    console.log(url)
    axios
      .post(url, data)
      .then(response => {
        console.log('api response',response.data)
        // dispatch(fetchSuccess(response.data));
      })
      .catch(error => {
        console.log("error",error)

        // dispatch(fetchError(error));
      });
  });
};

// export default apiServices;
