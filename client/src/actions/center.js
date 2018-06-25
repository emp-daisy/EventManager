import {
  API_URL,
  CLOUDINARY_API_URL,
  CLOUDINARY_PRESET
} from '../store/setupStore';
import { getToken } from './authentication';
import {
  addNotification,
  connectionError,
  validationError
} from './notify';

const uploadToCloudinary = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);
  return fetch(CLOUDINARY_API_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: formData
  })
    .then((res) => {
      if (res.status === 200) {
        const resData = res.json();
        return resData.secure_url;
      }
      return null;
    })
    .catch(() => null);
};

export const getCenters = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_NOTIFICATION'
  });
  dispatch({
    type: 'REQUEST_CENTERS'
  });

  return fetch(`${API_URL}centers`)
    .then(res => res.json())
    .then((data) => {
      let resCenters = [];
      if (data.val) {
        resCenters = data.val;
      }
      dispatch({
        type: 'REQUEST_CENTERS_GRANTED',
        data: resCenters
      });
    }, () => {
      dispatch({
        type: 'REQUEST_CENTERS_FAILED',
        msg: 'Error connecting to server...'
      });
      connectionError(dispatch);
    });
};

export const deleteCenter = id => (dispatch) => {
  dispatch({
    type: 'CLEAR_NOTIFICATION'
  });
  dispatch({
    type: 'DELETE_CENTERS'
  });
  return fetch(`${API_URL}centers/${id}`, {
    method: 'delete',
    headers: {
      'x-access-token': getToken()
    }
  })
    .then(res => res)
    .then((data) => {
      if (data.status === 200) {
        dispatch({
          type: 'DELETE_CENTERS_GRANTED',
          id
        });
        dispatch(addNotification({
          message: 'Delete successful',
          level: 'success',
          autoDismiss: 10
        }));
      } else {
        dispatch({
          type: 'DELETE_CENTERS_FAILED',
          msg: 'Error deleting from to server. TRY AGAIN LATER'
        });
        connectionError(dispatch, data.json());
      }
    }, () => {
      dispatch({
        type: 'DELETE_CENTERS_FAILED',
        msg: 'Error deleting from to server...'
      });
      connectionError(dispatch);
    });
};

export const createCenter = centerData => (dispatch) => {
  dispatch({
    type: 'CREATE_CENTERS'
  });
  const checkImage = () => ((centerData.filesToUpload !== undefined) ?
    uploadToCloudinary(centerData.filesToUpload) : Promise.resolve());
  return checkImage()
    .then((fileURL) => {
      if (fileURL !== null) {
        centerData.image = fileURL;

        return fetch(`${API_URL}centers/`, {
          method: 'post',
          headers: {
            'x-access-token': getToken(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(centerData)
        })
          .then(data => data.json()
            .then((res) => {
              if (data.status === 201) {
                dispatch({
                  type: 'CREATE_CENTERS_GRANTED',
                  newData: res.val
                });
                dispatch(addNotification({
                  message: 'New Center added successful',
                  level: 'success',
                  autoDismiss: 10
                }));
              } else {
                dispatch({
                  type: 'CREATE_CENTERS_FAILED',
                  msg: 'Error creating new center. TRY AGAIN LATER'
                });
                connectionError(dispatch, validationError(res));
              }
            }));
      }
      dispatch({
        type: 'CREATE_CENTERS_FAILED',
        msg: 'Error: Image upload failed...'
      });
      connectionError(dispatch);
    });
};

export const updateCenter = (centerData, id) => (dispatch) => {
  dispatch({
    type: 'CLEAR_NOTIFICATION'
  });
  dispatch({
    type: 'UPDATE_CENTERS'
  });
  const checkImage = () => ((centerData.filesToUpload !== undefined) ?
    uploadToCloudinary(centerData.filesToUpload) : Promise.resolve());
  return checkImage()
    .then((fileURL) => {
      if (fileURL !== null) {
        centerData.image = fileURL;
      }
      return fetch(`${API_URL}centers/${id}`, {
        method: 'put',
        body: JSON.stringify(centerData),
        headers: {
          'x-access-token': getToken(),
          'Content-Type': 'application/json'
        }
      })
        .then(
          data => data.json()
            .then((res) => {
              if (data.status === 200) {
                dispatch({
                  type: 'UPDATE_CENTERS_GRANTED',
                  newData: res.val
                });
                dispatch(addNotification({
                  message: 'Center update  successful',
                  level: 'success',
                  autoDismiss: 10
                }));
              }
              dispatch({
                type: 'UPDATE_CENTERS_FAILED',
                msg: 'Error updating center. TRY AGAIN LATER'
              });
              connectionError(dispatch, validationError(res));
            })
          , () => {
            dispatch({
              type: 'UPDATE_CENTERS_FAILED',
              msg: 'Error updating center...'
            });
            connectionError(dispatch);
          }
        );
    });
};

export const filterCentersBy = (filterValue, searchValue) => (dispatch) => {
  const query = {
    name: '',
    location: '',
    facilities: ''
  };
  query[filterValue] = searchValue.toString().toLowerCase();

  dispatch({
    type: 'CLEAR_NOTIFICATION'
  });
  dispatch({
    type: 'REQUEST_CENTERS'
  });

  return fetch(`${API_URL}centers/?${filterValue}=${searchValue.toString().toLowerCase()}`)
    .then(res => res.json())
    .then((data) => {
      let resCenters = [];
      if (data.val) {
        resCenters = data.val;
      }
      dispatch({
        type: 'REQUEST_CENTERS_GRANTED',
        data: resCenters
      });
    }, () => {
      dispatch({
        type: 'REQUEST_CENTERS_FAILED',
        msg: 'Error connecting to server...'
      });
      connectionError(dispatch);
    });
};

export const getSingleCenters = id => (dispatch) => {
  dispatch({
    type: 'CLEAR_NOTIFICATION'
  });
  dispatch({
    type: 'REQUEST_SINGLE_CENTERS'
  });

  return fetch(`${API_URL}centers/${id}`)
    .then(res => res.json())
    .then((data) => {
      let resCenters = [];
      if (data.val) {
        resCenters = data.val;
      }
      dispatch({
        type: 'REQUEST_SINGLE_CENTERS_GRANTED',
        data: resCenters
      });
    }, () => {
      dispatch({
        type: 'REQUEST_SINGLE_CENTERS_FAILED',
        msg: 'Error connecting to server...'
      });
      connectionError(dispatch);
    });
};

export const getCentersOptions = () => () => fetch(`${API_URL}centers`)
  .then(res => res.json())
  .then((data) => {
    let result = [];
    if (data.val && data.val.centers) {
      result = data.val.centers;
    }
    const resCenters = (result).map(center => ({
      name: `${center.name}, ${center.location}, ${center.state}`,
      id: center.id
    }));
    return {
      options: resCenters,
      complete: true
    };
  }, () => ({
    options: [],
    complete: true
  }));
