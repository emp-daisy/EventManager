
import axios from 'axios';
import { API_URL, CLOUDINARY_API_URL, CLOUDINARY_PRESET } from '../store/setupStore';
import { getToken } from './authentication';
import { addNotification, connectionError, validationError } from './notify';

const uploadToCloudinary = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);
  return axios
    .post(CLOUDINARY_API_URL, formData)
    .then((res) => {
      if (res.status === 200) {
        return res.data.secure_url;
      }
      return null;
    })
    .catch(() => null);
};

const deleteFromClodinary = () => {

};

export const getCenters = () => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'REQUEST_CENTERS' });

  fetch(`${API_URL}centers`)
    .then(res => res.json())
    .then((data) => {
      let resCenters = [];
      if (data.val) {
        resCenters = data.val;
      }
      dispatch({ type: 'REQUEST_CENTERS_GRANTED', data: resCenters });
    }, () => {
      dispatch({ type: 'REQUEST_CENTERS_FAILED', msg: 'Error connecting to server...' });
      connectionError(dispatch);
    });
};

export const deleteCenter = id => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'DELETE_CENTERS' });
  fetch(`${API_URL}centers/${id}`, {
    method: 'delete',
    headers: {
      'x-access-token': getToken()
    }
  })
    .then(res => res)
    .then((data) => {
      if (data.status === 200) {
        dispatch({ type: 'DELETE_CENTERS_GRANTED', id });
        dispatch(addNotification({
          message: 'Delete successful',
          level: 'success',
          autoDismiss: 10
        }));
      } else {
        dispatch({ type: 'DELETE_CENTERS_FAILED', msg: 'Error deleting from to server. TRY AGAIN LATER' });
        connectionError(dispatch, data.json());
      }
    }, () => {
      dispatch({ type: 'DELETE_CENTERS_FAILED', msg: 'Error deleting from to server...' });
      connectionError(dispatch);
    });
};

export const createCenter = centerData => (dispatch) => {
  dispatch({ type: 'CREATE_CENTERS' });
  const checkImage = () => ((centerData.filesToUpload !== undefined)
    ? uploadToCloudinary(centerData.filesToUpload) : Promise.resolve());
  checkImage()
    .then((fileURL) => {
      if (fileURL !== null) {
        centerData.image = fileURL;

        fetch(`${API_URL}centers/`, {
          method: 'post',
          headers: {
            'x-access-token': getToken(),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(centerData)
        })
          .then(res => res)
          .then((data) => {
            const dataBody = data.json();
            if (data.status === 201) {
              dataBody.then((res) => {
                dispatch({ type: 'CREATE_CENTERS_GRANTED', newData: res.val });
              });
              dispatch(addNotification({
                message: 'New Center added successful',
                level: 'success',
                autoDismiss: 10
              }));
            } else {
              dispatch({ type: 'CREATE_CENTERS_FAILED', msg: 'Error creating new event. TRY AGAIN LATER' });
              dataBody.then((res) => {
                connectionError(dispatch, validationError(res));
              });
            }
          }, () => {
            dispatch({ type: 'CREATE_CENTERS_FAILED', msg: 'Error creating new event...' });
            connectionError(dispatch);
          });
      } else {
        dispatch({ type: 'CREATE_CENTERS_FAILED', msg: 'Error creating new event...' });
        connectionError(dispatch);
      }
    });
};

export const updateCenter = (centerData, id) => (dispatch) => {
  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'UPDATE_CENTERS' });
  const oldImage = centerData.image;
  const checkImage = () => ((centerData.filesToUpload !== undefined)
    ? uploadToCloudinary(centerData.filesToUpload) : Promise.resolve());
  checkImage()
    .then((fileURL) => {
      if (fileURL !== null) {
        centerData.image = fileURL;
      }
      fetch(`${API_URL}centers/${id}`, {
        method: 'put',
        body: JSON.stringify(centerData),
        headers: {
          'x-access-token': getToken(),
          'Content-Type': 'application/json'
        }
      })
        .then(res => res)
        .then((data) => {
          const dataBody = data.json();
          if (data.status === 200) {
            if (oldImage !== null) {
              deleteFromClodinary(oldImage);
            }
            dataBody.then((res) => {
              dispatch({ type: 'UPDATE_CENTERS_GRANTED', newData: res.val });
            });
            dispatch(addNotification({
              message: 'Center update  successful',
              level: 'success',
              autoDismiss: 10
            }));
          } else {
            dispatch({ type: 'UPDATE_CENTERS_FAILED', msg: 'Error updating event. TRY AGAIN LATER' });
            dataBody.then((res) => {
              connectionError(dispatch, validationError(res));
            });
          }
        }, () => {
          dispatch({ type: 'UPDATE_CENTERS_FAILED', msg: 'Error updating event...' });
          connectionError(dispatch);
        });
    });
};

export const filterCentersBy = (filterValue, searchValue) => (dispatch) => {
  const query = { name: '', location: '', facilities: '' };
  query[filterValue] = searchValue.toString().toLowerCase();

  dispatch({ type: 'CLEAR_NOTIFICATION' });
  dispatch({ type: 'REQUEST_CENTERS' });

  fetch(`${API_URL}centers/?${filterValue}=${searchValue.toString().toLowerCase()}`)
    .then(res => res.json())
    .then((data) => {
      let resCenters = [];
      if (data.val) {
        resCenters = data.val;
      }
      dispatch({ type: 'REQUEST_CENTERS_GRANTED', data: resCenters });
    }, () => {
      dispatch({ type: 'REQUEST_CENTERS_FAILED', msg: 'Error connecting to server...' });
      connectionError(dispatch);
    });
};

export const getCentersOptions = () => () => fetch(`${API_URL}centers`)
  .then(res => res.json())
  .then((data) => {
    const resCenters = (data.val || []).map(center => ({ name: `${center.name}, ${center.location}, ${center.state}`, id: center.id }));
    return { options: resCenters, complete: true };
  }, () => ({ options: [], complete: true }));
